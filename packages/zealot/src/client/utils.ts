import {Response as NodeResponse} from "node-fetch"
import {decode} from "../encoder"
import {LoadContentType, LoadFormat, ResponseFormat} from "./types"

export function parseContent(resp: Response | NodeResponse) {
  if (resp.status === 204) return Promise.resolve(null)
  const type = resp.headers.get("Content-Type")
  switch (type) {
    case "application/json":
    case "application/x-zjson":
      try {
        return resp.json()
      } catch {
        console.error("Unable to parse json content, parsing as text instead")
        return resp.text()
      }
    case "text/html; charset=UTF-8":
    case "text/plain; charset=utf-8":
      return resp.text()
    case "application/vnd.tcpdump.pcap":
      return resp
    default:
      console.error(`unknown Content-Type: '${type}', parsing as text`)
      return resp.text()
  }
}

export function accept(format: ResponseFormat) {
  const formats = {
    arrows: "application/vnd.apache.arrow.stream",
    csv: "text/csv",
    json: "application/json",
    ndjson: "application/x-ndjson",
    vng: "application/x-vng",
    zeek: "application/x-zeek",
    zjson: "application/x-zjson",
    zng: "application/x-zng",
    zson: "application/x-zson",
  }
  const value = formats[format]
  if (!value) {
    throw Error(`Unknown Format: ${format}`)
  } else {
    return value
  }
}

export function defaults<T>(opts: Partial<T>, defs: T): T {
  return {...defs, ...opts}
}

export const getEnv = () => {
  // @ts-ignore
  return "fetch" in globalThis && !globalThis.fetch.polyfill ? "web" : "node"
}

export async function toJS(res: Response | NodeResponse) {
  const j = await res.json()
  return decode(j).toJS()
}

export function json(obj: any) {
  return JSON.stringify(obj)
}

export function wrapAbort(signal?: AbortSignal) {
  const ctl = new AbortController()
  signal?.addEventListener("abort", () => ctl.abort())
  return ctl
}

export function getLoadContentType(
  format?: LoadFormat
): LoadContentType | null {
  if (!format) return null
  if (format === "auto") return "*/*"
  if (format === "arrows") return "application/vnd.apache.arrow.stream"
  if (format === "csv") return "text/csv"
  if (format === "json") return "application/json"
  if (format === "line") return "application/x-line"
  if (format === "parquet") return "application/x-parquet"
  if (format === "vng") return "application/x-vng"
  if (format === "zeek") return "application/x-zeek"
  if (format === "zjson") return "application/x-zjson"
  if (format === "zng") return "application/x-zng"
  if (format === "zson") return "application/x-zson"
  throw new Error("Unknown load format: " + format)
}
