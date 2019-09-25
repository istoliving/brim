/* @flow */
import {useDispatch} from "react-redux"
import React, {useState} from "react"
import classNames from "classnames"

import type {TableColumn} from "../../state/columns/types"
import {updateColumns} from "../../state/columns/actions"
import columnKey from "../../lib/columnKey"
import IconDesc from "../../icons/icon-desc.svg"
import IconAsc from "../../icons/icon-asc.svg"

let oldWidth = null
let start = null
let add = document.addEventListener
let remove = document.removeEventListener

type Props = {
  column: TableColumn,
  tableId: string
}

function style(selector, key: string, value) {
  let el = document.querySelector(selector)
  if (!el) return
  // $FlowFixMe
  el.style[key] = value
}

export default function HeaderCell({column, tableId}: Props) {
  let dispatch = useDispatch()
  let [active, setActive] = useState(false)

  function onMouseMove(e: MouseEvent) {
    if (start !== null) {
      const moved = e.clientX - start
      const update = {[columnKey(column)]: {width: oldWidth + moved}}
      dispatch(updateColumns(tableId, update))
    }
  }

  function onMouseUp(_e: MouseEvent) {
    style("body", "cursor", "")
    style(".viewer .list", "pointerEvents", "")
    remove("mousemove", onMouseMove)
    remove("mouseup", onMouseUp)
    setActive(false)
  }

  function onMouseDown(e) {
    style("body", "cursor", "col-resize")
    style(".viewer .list", "pointerEvents", "none")
    oldWidth = column.width
    start = e.clientX
    add("mousemove", onMouseMove)
    add("mouseup", onMouseUp)
    setActive(true)
  }

  let [sorted, setSorted] = useState(null)
  function onClick() {
    setSorted(sorted === null ? "asc" : sorted === "asc" ? "desc" : null)
  }

  return (
    <div
      onClick={onClick}
      className={classNames("header-cell", {
        active,
        sorted
      })}
      style={{width: column.width || 300}}
    >
      {column.name}
      {sorted == "desc" && <IconDesc />}
      {sorted == "asc" && <IconAsc />}
      <div
        className="col-resizer"
        onMouseDown={onMouseDown}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}
