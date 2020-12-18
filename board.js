$(function() {
	const boardSelector = '.board-ui';
	const listsSelector = '.list-ui';
	const listsSelectorBody = '.list-ui-body';
	const cardsSelector = '.card-ui';
	const zIndexDefault = 1000;
	const zIndexUp = zIndexDefault + 50;

	const $lists = $(listsSelector);
	const $listsBody = $(listsSelectorBody);
	const $cards = $(cardsSelector);

    const elementDown = function(event, ui) {
		let $item = ui.element || $(ui.helper);
        $item.css('z-index', zIndexDefault);
    }
    const elementUp = function(event, ui) {
		let $item = ui.element || ui.item;
		$item.css('z-index', zIndexUp);
    };

	// Jquery Ui Resizable

	const startResize = function(event, ui) {
        elementUp(event, ui)
	};
	const stopResize = function(event, ui) {
		elementDown(event, ui)
	};
	const eventsResizable = {
		start: startResize,
		stop: stopResize
	};
	optionResizable = {
		...eventsResizable,
		minHeight: 100,
		minWidth: 100
	};
	$lists.each(function(index, elem) {
		$list = $(elem);
		const bodyList = $list.find(listsSelectorBody);
		optionResizable['alsoResize'] = bodyList;
		$list.resizable(optionResizable).disableSelection();
	});

	// Jquery Ui Draggable
	// Drag lists on the board

    const startDraggable = function( event, ui ) {
		
    }
    const stopDraggable = function(event, ui){
        
	}
	const dragDraggable = function( event, ui ) {
		
	}
    const eventsDraggable ={
		start: startDraggable,
		drag: dragDraggable,
        stop: stopDraggable,
    }
	optionsDraggable = {
        ...eventsDraggable,
		handle: '.list-ui-header',
		containment: boardSelector,
		stack: listsSelector
	};
	$lists.draggable(optionsDraggable).disableSelection();

    //Jquery Ui Sortable
	// Drag cards on the board and put to lists

   

	const dragItemStop = function(event, ui) {
		elementDown(event, ui)
		const selected = ui.item.data('multidrag');
		ui.item.after(selected);
		selected.css('z-index', zIndexDefault)
      	ui.item.remove();
	};

	const multiHelper = function(e, item) {
		if ( ! item.hasClass('ui-selected') ) {
		  item.parent().children('.ui-selected').removeClass('ui-selected');
		  item.addClass('ui-selected');
		}
  		var selected = item.parent().children('.ui-selected').clone();
		item.data('multidrag', selected).siblings('.ui-selected').remove();
		return $('<div/>').append(selected);
	  }

	const eventsSortable = {
		stop: dragItemStop
	};

	optionsSortable = {
		...eventsSortable,
		connectWith: listsSelectorBody,
		items: cardsSelector,
		cursor: 'grabbing',
		forcePlaceholderSize: true,
		forceHelperSize: true,
		placeholder: 'card-ui-placeholder',
		appendTo: 'body',
		helper:multiHelper
	};

	$listsBody.sortable(optionsSortable).disableSelection()

	$('body').on('click','.card-ui',function(event){
		$(event.target).toggleClass('ui-selected')
		console.log('click')
	})

	// // Jqury Ui Selectable	
    // const selectCreate = function( event, ui ) {
	// 	return false;
	// }
	// const selectItemStart = function(event, ui) {

	// 	console.log('selectItemStart')
	
	// };
	// const selectingItem = function( event, ui ) {
	// 	console.log(ui)
	// }
	// eventsSelectable = {
	// 	create: selectCreate,
	// 	start: selectItemStart,
	// 	selecting:selectingItem
	// };
	// optionsSelectable = {
	// 	...eventsSelectable
	// 	// classes: {
	// 	// 	'ui-selected': 'card-ui-selected',
	// 	// 	'ui-selecting': 'card-ui-selected'
	// 	// }
	// };
    // $listsBody.each(function(index,elem){
	// 	let $listBody = $(elem)
	// 	optionsSelectable['appendTo'] = elem
	// 	$listBody.selectable(optionsSelectable)
	// })
});
