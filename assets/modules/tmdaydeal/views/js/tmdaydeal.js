/**
* 2002-2015 TemplateMonster
*
* TemplateMonster Deal of Day
*
* NOTICE OF LICENSE
*
* This source file is subject to the General Public License (GPL 2.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/GPL-2.0
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade the module to newer
* versions in the future.
*
*  @author    TemplateMonster (Sergiy Sakun)
*  @copyright 2002-2016 TemplateMonster
*  @license   http://opensource.org/licenses/GPL-2.0 General Public License (GPL 2.0)
*/

function findCombination()
{
	$('#minimal_quantity_wanted_p').fadeOut();
	if (typeof $('#minimal_quantity_label').text() === 'undefined' || $('#minimal_quantity_label').html() > 1)
		$('#quantity_wanted').val(1);

	//create a temporary 'choice' array containing the choices of the customer
	var choice = [];
	var radio_inputs = parseInt($('#attributes .checked > input[type=radio]').length);
	if (radio_inputs)
		radio_inputs = '#attributes .checked > input[type=radio]';
	else
		radio_inputs = '#attributes input[type=radio]:checked';

	$('#attributes select, #attributes input[type=hidden], ' + radio_inputs).each(function(){
		choice.push(parseInt($(this).val()));
	});

	//verify if this combinaison is the same that the user's choice
	if (typeof combinationsHashSet !== 'undefined') {
		var combination = combinationsHashSet[choice.sort().join('-')];

		if (combination)
		{
			if (combination['minimal_quantity'] > 1)
			{
				$('#minimal_quantity_label').html(combination['minimal_quantity']);
				$('#minimal_quantity_wanted_p').fadeIn();
				$('#quantity_wanted').val(combination['minimal_quantity']);
				$('#quantity_wanted').bind('keyup', function() {checkMinimalQuantity(combination['minimal_quantity']);});
			}
			//combination of the user has been found in our specifications of combinations (created in back office)
			selectedCombination['unavailable'] = false;
			selectedCombination['reference'] = combination['reference'];
			$('#idCombination').val(combination['idCombination']);

			//get the data of product with these attributes
			quantityAvailable = combination['quantity'];
			selectedCombination['price'] = combination['price'];
			if(selectedCombination['price'] != 0)
			{
				$('.daydeal-box-product').addClass('act');
			}
			else
			{
				$('.daydeal-box-product').removeClass('act')
			}
			selectedCombination['unit_price'] = combination['unit_price'];
			selectedCombination['specific_price'] = combination['specific_price'];
			if (combination['ecotax'])
				selectedCombination['ecotax'] = combination['ecotax'];
			else
				selectedCombination['ecotax'] = default_eco_tax;

			//show the large image in relation to the selected combination
			if (combination['image'] && combination['image'] != -1)
				displayImage($('#thumb_' + combination['image']).parent());

			//show discounts values according to the selected combination
			if (combination['idCombination'] && combination['idCombination'] > 0)
				displayDiscounts(combination['idCombination']);

			//get available_date for combination product
			selectedCombination['available_date'] = combination['available_date'];

			//update the display
			updateDisplay();

			if (firstTime)
			{
				refreshProductImages(0);
				firstTime = false;
			}
			else
				refreshProductImages(combination['idCombination']);
			//leave the function because combination has been found
			return;
		}
	}

	//this combination doesn't exist (not created in back office)
	selectedCombination['unavailable'] = true;
	if (typeof(selectedCombination['available_date']) !== 'undefined')
		delete selectedCombination['available_date'];

	updateDisplay();
}