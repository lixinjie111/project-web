import VXETable from 'vxe-table'

// 创建一个简单的超链接渲染
VXETable.renderer.add('MyLink', {
  // 默认显示模板
  renderDefault (h, renderOpts, params) {
    let { row, column } = params
    let { events } = renderOpts
    return [
      <a class="my-link" onClick={ () => events.click(params) }>{row[column.property]}</a>
    ]
  }
})