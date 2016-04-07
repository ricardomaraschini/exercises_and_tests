# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

window.timer = 0

ready = ->
	showHotel = (ev, ui) ->
		table = $('<table></table>').addClass("table table-bordered");
		for prop,val of ui.item.value
			if prop.indexOf('_') != -1
				continue
			tr = $('<tr></tr>');
			tr.append $('<td></td>').text(prop)
			tr.append $('<td></td>').text(val)
			table.append tr
		$('#filtered').append(table)
		$('input#search').val(ui.item.label)
		return false

	filter = () ->
		$('#filtered').html('')
		$('#progressBar').css("visibility", "visible");
		if $('input#search').val() == ""
			$('#progressBar').css("visibility", "hidden");
			return

		url = '/filter/' + $('input#search').val()
		$.get url, (data) ->
			searchString = $('input#search').val()
			autoC = []
			for h in data
				if h.name.indexOf(searchString) > -1
					autoC.push { label: h.name, value: h }

				if h.address.indexOf(searchString) > -1
					autoC.push { label: h.address, value: h }

			$('#progressBar').css("visibility", "hidden");
			$('input#search').autocomplete({source: autoC, select: showHotel})
			$('input#search').autocomplete( "search", searchString)



	$('input#search').keyup ->
		window.clearTimeout window.timer
		window.timer = window.setTimeout filter, 400
	

$(document).ready(ready)
$(document).on('page:load', ready)
