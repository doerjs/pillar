export default function usePanel(tab, tabListState, tabListOperator) {
  const isSelected = tab.value === tabListState.selectedTabValue

  const panelProps = {}
  panelProps.role = 'tabpanel'

  panelProps.id = `tab-panel-${tab.value}`

  panelProps['aria-labelledby'] = `tab-${tab.value}`
  panelProps['aria-hidden'] = !isSelected

  return { panelProps }
}
