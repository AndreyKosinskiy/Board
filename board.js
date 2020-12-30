$(function() {
	const boardSelector = '.board-ui';
	const listsSelector = '.list-ui';
	const listsSelectorBody = '.list-ui-body';
	const cardsSelector = '.card-ui';
	const selectedClass = 'ui-selected';
	const placeholderClass = 'card-ui-placeholder';
	const zIndexDefault = 1000;
	const zIndexUp = zIndexDefault + 50;

	const $board = $(boardSelector);
	const $lists = $(listsSelector);
	const $listsBody = $(listsSelectorBody);
	const $cards = $(cardsSelector);
	let helperBox = null;

	const elementDown = function(event, ui) {
		let $item = ui.element || $(ui.helper);
		$item.css('z-index', zIndexDefault);
	};
	const elementUp = function(event, ui) {
		let $item = ui.element || ui.item;
		$item.css('z-index', zIndexUp);
	};

	window.onclick = function(event) {
		let target = $(event.target)
		if (target.hasClass('card-ui') && event.ctrlKey){
			if (event.ctrlKey){
				target.toggleClass(selectedClass)
			}
		}else{
			$('.'+selectedClass).toggleClass(selectedClass)
		}
	};
	// Jquery Ui Resizable

	const startResize = function(event, ui) {
		elementUp(event, ui);
		var pz = $board.find('#panzoom');
		pz.panzoom("disable");
	};
	const stopResize = function(event, ui) {
		elementDown(event, ui);
		$board.find("#panzoom").panzoom("enable");
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

	const startDraggable = function(event, ui) {
		var pz = $board.find('#panzoom');
		currentScale = pz.panzoom('getMatrix')[0];
		$(this).css('cursor', 'move');
		pz.panzoom("disable");
	};
	const stopDraggable = function(event, ui) {
		$(this).css('cursor', '');
		$board.find("#panzoom").panzoom("enable");
	};

	const dragDraggable = function(event, ui) {
		//fix for panzooming
		ui.position.left = ui.position.left / currentScale;
		ui.position.top = ui.position.top / currentScale;
	
	};
	const eventsDraggable = {
		start: startDraggable,
		drag: dragDraggable,
		stop: stopDraggable
	};
	optionsDraggable = {
		...eventsDraggable,
		handle: '.list-ui-header',
		stack: listsSelector,
	};
	$lists.draggable(optionsDraggable).disableSelection();
	//Jquery Ui Sortable
	// Drag cards on the board and put to lists

	const sortableItemStop = function(event, ui) {
		console.log("revert?: "+ revert)
		if(!revert){
			
			elementDown(event, ui);
			const selected = ui.item.data('multidrag');
			ui.item.after(selected);
			selected.css('z-index', zIndexDefault);
			ui.item.remove();
			// $('.card-hide').remove();
			//fix bug after drop in sortable
			$('.list-ui-body').each(function(index,elem){
				$(elem).css('cursor','')
			})
			//manual call eventListener
			$($panzoom.parent()).trigger('mouseup')
			stopDraggable(event, ui)
			ui.item.remove();
			$('.card-hide').remove();
		}else{
			// revert ui.item
			// const selected = ui.item.data('multidrag');
			console.log(helperBox)
			const selected = helperBox.data('multidrag')
			$('.card-hide').removeClass('card-hide')
			revert = false
			$listsBody.sortable("enable")
		}
		helperBox = null
	};

	const multiHelper = function(e, item) {
		console.log(arguments)
		if (!item.hasClass('ui-selected')) {
			item.parent().children('.ui-selected').removeClass('ui-selected');
			item.addClass('ui-selected');
		}
		var selected = $('.ui-selected').clone();
		var helperBox = $('<div/>').append(selected)
		$('.ui-selected').addClass('card-hide')
		//item.data('multidrag', selected)
		helperBox.data('multidrag', selected)
		console.log(helperBox.data('multidrag'))
		return helperBox;
	};

	const sortableOut = function(event, ui){
		$(ui.placeholder).addClass('hide');
	}

	const sortableOver = function(event, ui){
		$(ui.placeholder).removeClass('hide');
		ui.item.remove();
	}
	var revert = false;
	const revertSortable = function(event, ui){
		// check on revert
		if($('.'+placeholderClass).hasClass('hide')){
			revert = true
			$listsBody.sortable("disable")
		}else{
			revert = false
		}
	}

	const sortableReceive = function(event, ui){
		console.log(ui)
	}
	const eventsSortable = {
		activate: startDraggable,
		stop: sortableItemStop,
		beforeStop: revertSortable,
		out: sortableOut,
		over: sortableOver,
		receive: sortableReceive
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
		helper: multiHelper
	};
	// for know revert position on each card {cardID:listID}
	
	$listsBody.sortable(optionsSortable).disableSelection();

	//Panzoom
	var minScale = 0.4;
	var maxScale = 2;
	var incScale = 0.1;
	$panzoom = $board
		.find('#panzoom')
		.panzoom({
			minScale: minScale,
			maxScale: maxScale,
			increment: incScale,
			cursor: '',
			ignoreChildrensEvents: true,

		})
		.on('panzoomstart', function(e, pz, ev) {
			$panzoom.css('cursor', 'move');
		})
		.on('panzoomend', function(e, pz) {
			$panzoom.css('cursor', '');
		});
	$panzoom
		.parent()
		.on('mousewheel.focal', function(e) {
			if (e.ctrlKey || e.originalEvent.ctrlKey) {
				e.preventDefault();
				var delta = e.delta || e.originalEvent.wheelDelta;
				var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
				$panzoom.panzoom('zoom', zoomOut, {
					animate: true,
					exponential: false
				});
			} else {
				e.preventDefault();
				var deltaY = e.deltaY || e.originalEvent.wheelDeltaY || -e.originalEvent.deltaY;
				var deltaX = e.deltaX || e.originalEvent.wheelDeltaX || -e.originalEvent.deltaX;
				$panzoom.panzoom('pan', deltaX / 2, deltaY / 2, {
					animate: true,
					relative: true
				});
			}
		})
		.on('mousedown touchstart', function(ev) {
			var matrix = $board.find('#panzoom').panzoom('getMatrix');
			var offsetX = matrix[4];
			var offsetY = matrix[5];
			var dragstart = { x: ev.pageX, y: ev.pageY, dx: offsetX, dy: offsetY };
			var target = ev.target
			$(this).data('dragstart', dragstart);
			//cursor fix
			if (!$(target).hasClass('ui-resizable-handle')){
				$(ev.target).css('cursor', 'move');
			}


		})
		.on('mousemove touchmove', function(ev) {
			var dragstart = $(this).data('dragstart');
			if (dragstart) {
				var deltaX = dragstart.x - ev.pageX;
				var deltaY = dragstart.y - ev.pageY;
				var matrix = $board.find('#panzoom').panzoom('getMatrix');
				matrix[4] = parseInt(dragstart.dx) - deltaX;
				matrix[5] = parseInt(dragstart.dy) - deltaY;
				$board.find('#panzoom').panzoom('setMatrix', matrix);
			}
		})
		.on('mouseup touchend touchcancel', function(ev) {
			$(this).data('dragstart', null);
			$(ev.target).css('cursor', '');
		});

		$lists.on('mousedown mousewheel.focal',function(event){
			event.stopPropagation();
		})
});
