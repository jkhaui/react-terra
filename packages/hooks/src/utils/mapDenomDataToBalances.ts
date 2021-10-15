import { JSONMap } from '@webreflection/json-map'
import autImg from '@degenlabs/terra-ui-assets/AUT.png'
import catImg from '@degenlabs/terra-ui-assets/CAT.png'
import chtImg from '@degenlabs/terra-ui-assets/CHT.png'
import cntImg from '@degenlabs/terra-ui-assets/CNT.png'
import dktImg from '@degenlabs/terra-ui-assets/DKT.png'
import eutImg from '@degenlabs/terra-ui-assets/EUT.png'
import gbtImg from '@degenlabs/terra-ui-assets/GBT.png'
import hktImg from '@degenlabs/terra-ui-assets/HKT.png'
import idtImg from '@degenlabs/terra-ui-assets/IDT.png'
import intImg from '@degenlabs/terra-ui-assets/INT.png'
import jptImg from '@degenlabs/terra-ui-assets/JPT.png'
import krtImg from '@degenlabs/terra-ui-assets/KRT.png'
import mntImg from '@degenlabs/terra-ui-assets/MNT.png'
import notImg from '@degenlabs/terra-ui-assets/NOT.png'
import phtImg from '@degenlabs/terra-ui-assets/PHT.png'
import sdtImg from '@degenlabs/terra-ui-assets/SDT.png'
import setImg from '@degenlabs/terra-ui-assets/SET.png'
import sgtImg from '@degenlabs/terra-ui-assets/SGT.png'
import thtImg from '@degenlabs/terra-ui-assets/THT.png'
import ustImg from '@degenlabs/terra-ui-assets/UST.png'
import { Denom, FiatCurrencies, TerraStablecoins } from '../types'
import { LOCAL_STORAGE_BALANCES_KEY } from './constants'

/**
 * `mapDenomDataToBalances` is a hashtable which extends/modifies the
 * `coins.toData` object return by Terra.js' bank API.
 * - https://immerjs.github.io/immer/update-patterns/
 *
 * Besides providing a more developer-friendly API to work from, it is also
 * essential to the rendering of Terra asset data; it acts as a blueprint so
 * that immediate hydration of the cache can occur.
 */
export const mapDenomDataToBalances = (
  isInitializing: boolean = !localStorage.getItem(LOCAL_STORAGE_BALANCES_KEY)
) =>
  new JSONMap([
    /*    [
     Denom.LUNA,
     {
     currencySymbol: LUNA_TICKER,
     terraSymbol: LUNA_TICKER,
     img: lunaImg,
     formattedAmount: '',
     denomToUSTExchangeRate: 1,
     amount: 0,
     isLoading: isInitializing
     }
     ], */
    [
      Denom.AUD,
      {
        currencySymbol: FiatCurrencies.AUD,
        terraSymbol: TerraStablecoins.AUT,
        img: autImg,
        formattedAmount: '',
        denomToUSTExchangeRate: 1,
        amount: 0,
        isLoading: isInitializing
      }
    ],
    [
      Denom.CAD,
      {
        currencySymbol: FiatCurrencies.CAD,
        terraSymbol: TerraStablecoins.CAT,
        img: catImg,
        formattedAmount: '',
        denomToUSTExchangeRate: 1,
        amount: 0,
        isLoading: isInitializing
      }
    ],
    [
      Denom.CHF,
      {
        currencySymbol: FiatCurrencies.CHF,
        terraSymbol: TerraStablecoins.CHT,
        img: chtImg,
        formattedAmount: '',
        denomToUSTExchangeRate: 1,
        amount: 0,
        isLoading: isInitializing
      }
    ],
    [
      Denom.CNY,
      {
        currencySymbol: FiatCurrencies.CNY,
        terraSymbol: TerraStablecoins.CNT,
        img: cntImg,
        formattedAmount: '',
        denomToUSTExchangeRate: 1,
        amount: 0,
        isLoading: isInitializing
      }
    ],
    [
      Denom.DKK,
      {
        currencySymbol: FiatCurrencies.DKK,
        terraSymbol: TerraStablecoins.DKT,
        img: dktImg,
        formattedAmount: '',
        denomToUSTExchangeRate: 1,
        amount: 0,
        isLoading: isInitializing
      }
    ],
    [
      Denom.EUR,
      {
        currencySymbol: FiatCurrencies.EUR,
        terraSymbol: TerraStablecoins.EUT,
        img: eutImg,
        formattedAmount: '',
        denomToUSTExchangeRate: 1,
        amount: 0,
        isLoading: isInitializing
      }
    ],
    [
      Denom.GBP,
      {
        currencySymbol: FiatCurrencies.GBP,
        terraSymbol: TerraStablecoins.GBT,
        img: gbtImg,
        formattedAmount: '',
        denomToUSTExchangeRate: 1,
        amount: 0,
        isLoading: isInitializing
      }
    ],
    [
      Denom.HKD,
      {
        currencySymbol: FiatCurrencies.HKD,
        terraSymbol: TerraStablecoins.HKT,
        img: hktImg,
        formattedAmount: '',
        denomToUSTExchangeRate: 1,
        amount: 0,
        isLoading: isInitializing
      }
    ],
    [
      Denom.IDR,
      {
        currencySymbol: FiatCurrencies.IDR,
        terraSymbol: TerraStablecoins.IDT,
        img: idtImg,
        formattedAmount: '',
        denomToUSTExchangeRate: 1,
        amount: 0,
        isLoading: isInitializing
      }
    ],
    [
      Denom.INR,
      {
        currencySymbol: FiatCurrencies.INR,
        terraSymbol: TerraStablecoins.INT,
        img: intImg,
        formattedAmount: '',
        denomToUSTExchangeRate: 1,
        amount: 0,
        isLoading: isInitializing
      }
    ],
    [
      Denom.JPY,
      {
        currencySymbol: FiatCurrencies.JPY,
        terraSymbol: TerraStablecoins.JPT,
        img: jptImg,
        formattedAmount: '',
        denomToUSTExchangeRate: 1,
        amount: 0,
        isLoading: isInitializing
      }
    ],
    [
      Denom.KRW,
      {
        currencySymbol: FiatCurrencies.KRW,
        terraSymbol: TerraStablecoins.KRT,
        img: krtImg,
        formattedAmount: '',
        denomToUSTExchangeRate: 1,
        amount: 0,
        isLoading: isInitializing
      }
    ],
    [
      Denom.MNT,
      {
        currencySymbol: FiatCurrencies.MNT,
        terraSymbol: TerraStablecoins.MNT,
        img: mntImg,
        formattedAmount: '',
        denomToUSTExchangeRate: 1,
        amount: 0,
        isLoading: isInitializing
      }
    ],
    [
      Denom.NOK,
      {
        currencySymbol: FiatCurrencies.NOK,
        terraSymbol: TerraStablecoins.NOT,
        img: notImg,
        formattedAmount: '',
        denomToUSTExchangeRate: 1,
        amount: 0,
        isLoading: isInitializing
      }
    ],
    [
      Denom.PHP,
      {
        currencySymbol: FiatCurrencies.PHP,
        terraSymbol: TerraStablecoins.PHT,
        img: phtImg,
        formattedAmount: '',
        denomToUSTExchangeRate: 1,
        amount: 0,
        isLoading: isInitializing
      }
    ],
    [
      Denom.SDR,
      {
        currencySymbol: FiatCurrencies.SDR,
        terraSymbol: TerraStablecoins.SDT,
        img: sdtImg,
        formattedAmount: '',
        denomToUSTExchangeRate: 1,
        amount: 0,
        isLoading: isInitializing
      }
    ],
    [
      Denom.SEK,
      {
        currencySymbol: FiatCurrencies.SEK,
        terraSymbol: TerraStablecoins.SET,
        img: setImg,
        formattedAmount: '',
        denomToUSTExchangeRate: 1,
        amount: 0,
        isLoading: isInitializing
      }
    ],
    [
      Denom.SGD,
      {
        currencySymbol: FiatCurrencies.SGD,
        terraSymbol: TerraStablecoins.SGT,
        img: sgtImg,
        formattedAmount: '',
        denomToUSTExchangeRate: 1,
        amount: 0,
        isLoading: isInitializing
      }
    ],
    [
      Denom.THB,
      {
        currencySymbol: FiatCurrencies.THB,
        terraSymbol: TerraStablecoins.THT,
        img: thtImg,
        formattedAmount: '',
        denomToUSTExchangeRate: 1,
        amount: 0,
        isLoading: isInitializing
      }
    ],
    [
      Denom.USD,
      {
        currencySymbol: FiatCurrencies.USD,
        terraSymbol: TerraStablecoins.UST,
        img: ustImg,
        formattedAmount: '',
        denomToUSTExchangeRate: 1,
        amount: 0,
        isLoading: isInitializing
      }
    ]
  ])
