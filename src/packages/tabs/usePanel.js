export default function usePanel(tab, tabListState) {
  const isSelected = tab.props.value === tabListState.value

  const panelProps = {}
  panelProps.role = 'tabpanel'

  panelProps.id = `tab-panel-${tab.props.value}`

  panelProps['aria-labelledby'] = `tab-${tab.props.value}`
  panelProps['aria-hidden'] = !isSelected

  return { panelProps }
}
