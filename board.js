const listsSelector = ".list-ui"
const $lists = $(listsSelector)

optionsDraggable={
    handle:'.list-ui-header'
}
$lists.draggable(optionsDraggable);

optionsSortable ={
    connectWith: listsSelector,
    items:'.card-ui',
}
$lists.sortable(optionsSortable);