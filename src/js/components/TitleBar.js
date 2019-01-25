/* @flow */

import React from "react"
import {PaneHeader, Center, Left, Right, PaneTitle} from "./Pane"
import {disconnect} from "../actions/connect"
import {connect} from "react-redux"
import {getBoomHost, getBoomPort} from "../reducers/boomdCredentials"
import dispatchToProps from "../lib/dispatchToProps"

type Props = {|
  host: string,
  port: string,
  dispatch: Function
|}

export default class TitleBar extends React.Component<Props> {
  onHostClick: Function

  constructor(props: Props) {
    super(props)
    this.onHostClick = () => props.dispatch(disconnect())
  }

  render() {
    const {host, port} = this.props
    return (
      <div className="title-bar">
        <PaneHeader>
          <Left />
          <Center>
            <PaneTitle>
              <span onClick={this.onHostClick}>
                {host}:{port}
              </span>{" "}
            </PaneTitle>
          </Center>
          <Right />
        </PaneHeader>
      </div>
    )
  }
}

const stateToProps = state => ({
  host: getBoomHost(state),
  port: getBoomPort(state)
})

export const XTitleBar = connect<Props, {||}, _, _, _, _>(
  stateToProps,
  dispatchToProps
)(TitleBar)
