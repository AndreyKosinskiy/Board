$(function(){
    const boardSelector = ".board-ui"
    const listsSelector = ".list-ui"
    const listsSelectorBody = ".list-ui-body"
    const cardsSelector = '.card-ui'
    const zIndexDefault = 1000
    const zIndexUp = zIndexDefault+50

    const $lists = $(listsSelector)
    const $listsBody = $(listsSelectorBody)
    const $cards = $(cardsSelector)

     // Jquery Ui Resizable 
    //  const startResize = function( event, ui ) {
    //     let $item =  ui.element
    //         $item.css('z-index', zIndexUp)

    //  }
    //  const stopResize = function( event, ui ) {
    //     let $item =  ui.element
    //     if($item){
    //         $item.css('z-index',zIndexDefault)
    //     }
    //  }
    //  const eventsResizable = {
    //     start: startResize,
    //     stop: stopResize
    // }
    // optionResizable = {
    //     ...eventsResizable,
    //     minHeight: 100,
    //     minWidth: 100,
    // }
    // $lists.each(function(index,elem){
    //     $list = $(elem)
    //     const bodyList = $list.find(listsSelectorBody)
    //     optionResizable['alsoResize'] = bodyList
    //     $list.resizable(optionResizable).disableSelection();

    // })

    // Jquery Ui Draggable 

    // optionsDraggable={
    //     handle:'.list-ui-header',
    //     containment: ".board-ui"
    // }
    // $lists.draggable(optionsDraggable).disableSelection();

    // Jquery Ui Sortable
    // const dragItemStart = function( event, ui ) {
    //     let $item =  ui.item
    //     $item.css('z-index', zIndexUp)
    // }

    // const dragItemStop = function( event, ui ) {
    //     let $item =  ui.item
    //     $item.css('z-index', zIndexDefault)
    // }

    // const eventsSortable = {
    //     start: dragItemStart,
    //     stop:dragItemStop
    // }

    // optionsSortable ={
    //     ...eventsSortable,
    //     connectWith: listsSelectorBody,
    //     items:cardsSelector,
    //     cursor:"grabbing",
    //     forcePlaceholderSize: true,
    //     forceHelperSize: true,
    //     placeholder:'card-ui-placeholder'
    // }
    // $listsBody.sortable(optionsSortable).disableSelection();

    // Jqury Ui Selectable
    const selectItemStart =  function( event, ui ) {
        console.log(event);
        console.log(ui);
        console.log(event.target.value)
    }
    eventsSelectable = {
        start:selectItemStart
    }
    optionsSelectable = {
        ...eventsSelectable,
        tolerance: "touch",
        classes: {
            "ui-selected": "card-ui-selected",
            "ui-selecting":"card-ui-selected"
          }
    }
    $cards.selectable(optionsSelectable);
})

 