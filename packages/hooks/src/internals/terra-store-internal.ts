// @ts-nocheck
// Credit to https://github.com/simbo/small-store
import produce from 'immer'
import { BehaviorSubject, Subject } from 'rxjs'
import { distinctUntilChanged, take } from 'rxjs/operators'
import { deepEqual } from 'fast-equals'

export type ActionPayload<ACTION extends string> = {
  [KEY in ACTION]?: { [key: string]: any }
}

export interface ActionMeta<
  ACTION extends string,
  PAYLOAD extends ActionPayload<ACTION> = {}
> {
  name: ACTION
  payload: PAYLOAD[ACTION]
}

export type ActionHandler<STATE, PAYLOAD> =
  | ((payload: PAYLOAD | never) => (state: STATE) => STATE)
  | ((payload: PAYLOAD | never) => Partial<STATE>)

export type Actions<
  STATE,
  ACTION extends string,
  PAYLOAD extends ActionPayload<ACTION> = {}
> = {
  [KEY in ACTION]?: ActionHandler<STATE, PAYLOAD[KEY]>
}

export type EffectHandler<
  STATE,
  ACTION extends string,
  PAYLOAD extends ActionPayload<ACTION> = {}
> = (
  action: ActionMeta<ACTION, PAYLOAD>,
  state: STATE,
  dispatch: (action: ACTION, payload?: PAYLOAD[ACTION]) => void
) => void

export type Effects<
  STATE,
  ACTION extends string,
  PAYLOAD extends ActionPayload<ACTION> = {}
> = {
  [KEY in ACTION]?: EffectHandler<STATE, ACTION, PAYLOAD>
}

export type Selector<STATE> = (state: STATE) => any

export interface Selectors<STATE> {
  [key: string]: Selector<STATE>
}

export class Store<
  STATE,
  ACTION extends string,
  PAYLOAD extends ActionPayload<ACTION> = {}
> {
  // @internal
  public readonly initialState: STATE

  // @internal
  private readonly stateSubject: BehaviorSubject<STATE>

  // @internal
  private readonly actionsSubject = new Subject<
    ActionMeta<ACTION, PAYLOAD> & { previousState: STATE; state: STATE }
  >()

  // @internal
  private readonly actionsQueue: ActionMeta<ACTION, PAYLOAD>[] = []

  // @internal
  private readonly actions: Actions<STATE, ACTION, PAYLOAD>

  // @internal
  private readonly effects?: Effects<STATE, ACTION, PAYLOAD>

  // @internal
  private actionInProgress = false

  constructor(
    initialState: STATE,
    actions: Actions<STATE, ACTION, PAYLOAD>,
    effects?: Effects<STATE, ACTION, PAYLOAD>
  ) {
    this.actions = actions
    this.effects = effects
    this.initialState = produce({}, () => initialState) as STATE
    this.stateSubject = new BehaviorSubject<STATE>(this.initialState)
  }

  public get state$(): any {
    return this.stateSubject.pipe(
      distinctUntilChanged((a, b) => deepEqual(a, b))
    )
  }
  // public get state$(): any {
  //  return this.stateSubject.pipe(
  //    distinctUntilChanged((a, b) => a === b, JSON.stringify)
  //  )
  // }

  public get actions$(): any {
    return this.actionsSubject.asObservable()
  }

  public readonly dispatch = (
    name: ACTION,
    payload?: PAYLOAD[ACTION]
  ): void => {
    this.actionsQueue.push({ name, payload: payload as PAYLOAD[ACTION] })
    this.nextAction()
  }

  // @internal
  private readonly dispatchImmediately = (
    name: ACTION,
    payload?: PAYLOAD[ACTION]
  ): void => {
    this.actionsQueue.unshift({ name, payload: payload as PAYLOAD[ACTION] })
    this.nextAction()
  }

  // @internal
  private nextAction(): void {
    if (this.actionInProgress || !this.actionsQueue.length) {
      return
    }
    this.actionInProgress = true
    this.state$.pipe(take(1)).subscribe((state) => {
      const { name, payload } = this.actionsQueue.shift() as ActionMeta<
        ACTION,
        PAYLOAD
      >
      const nextState = this.runAction(name, payload, state)
      this.actionsSubject.next({
        name,
        payload,
        previousState: state,
        state: nextState
      })
      this.stateSubject.next(nextState)
      this.runEffect(name, payload, nextState)
      this.actionInProgress = false
      this.nextAction()
    })
  }

  // @internal
  private runAction(
    name: ACTION,
    payload: PAYLOAD[ACTION],
    state: STATE
  ): STATE {
    const actionResult = this.actions[name]
      ? (this.actions[name] as ActionHandler<STATE, PAYLOAD[ACTION]>)(payload)
      : ({} as Partial<STATE>)
    return typeof actionResult === 'function'
      ? (produce(state, actionResult) as STATE)
      : (produce(state, (draft) => ({ ...draft, ...actionResult })) as STATE)
  }

  // @internal
  private runEffect(
    name: ACTION,
    payload: PAYLOAD[ACTION],
    state: STATE
  ): void {
    if (this.effects && this.effects[name]) {
      ;(this.effects[name] as EffectHandler<STATE, ACTION, PAYLOAD>)(
        {
          name,
          payload
        },
        state,
        this.dispatchImmediately
      )
    }
  }
}
