import { BigNumber } from "ethers";
import {
  commify,
  formatEther,
  formatUnits,
  parseUnits,
} from "ethers/lib/utils.js";

export function etow(inputValue: string) {
  return parseUnits(inputValue.toString());
}

export function wtoe(weis: BigNumber | undefined, maxDecimals = 5) {
  if (!weis) {
    return "";
  }
  const units = parseUnits("1", 18 - maxDecimals);
  return formatUnits(weis.div(units).mul(units));
}

export function wtoeCommify(weis: BigNumber | undefined) {
  if (!weis) {
    return "";
  }
  return formatStringDecimals(commify(formatEther(weis)), 2);
}

export function formatStringDecimals(num: string, decimals: number) {
  if (num.includes(".")) {
    const numArr = num.split(".");
    const decimalsLength = numArr[1].length;
    if (decimalsLength >= decimals) {
      return `${numArr[0]}.${numArr[1].substring(0, decimals)}`;
    } else {
      return `${numArr[0]}.${numArr[1]}${addZeros(decimals - decimalsLength)}`;
    }
  } else {
    return `${num}.${addZeros(decimals)}`;
  }
}

export function addZeros(length: number) {
  let zeros = "";
  for (let i = 0; i < length; i++) {
    zeros += "0";
  }
  return zeros;
}

export function showShortAccountId(accountId: string): string {
  if (accountId.length > 14) {
    return accountId.slice(0, 6) + ".." + accountId.slice(-6);
  }
  return accountId;
}
