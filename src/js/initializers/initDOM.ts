export default function () {
  appendDivId("app-root")
  appendDivId("notification-root")
  appendDivId("modal-root")
  appendDivId("tooltip-root")
  appendDivId("context-menu-root")
  appendDivId("measure-layer", {hidden: true})
}

type Args = {
  hidden: boolean
}

function appendDivId(id: string, args: Partial<Args> = {}) {
  const div = document.createElement("div")
  div.id = id
  if (args.hidden) div.style.visibility = "hidden"
  if (document.body) document.body.appendChild(div)
}
