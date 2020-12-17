const listsSelector = ".list-ui"
const $lists = $(listsSelector)

// optionsDraggable={
//     handle:'.list-ui-header'
// }
// $lists.draggable(optionsDraggable).disableSelection();

optionsSortable ={
    connectWith: listsSelector,
    items:'.card-ui',
    cursor:"grabbing",
    forcePlaceholderSize: true,
    forceHelperSize: true,
    placeholder:'card-ui-placeholder'
}
$lists.sortable(optionsSortable).disableSelection();;