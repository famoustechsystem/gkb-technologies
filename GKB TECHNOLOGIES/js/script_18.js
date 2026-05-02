
  $(document).ready(function(){
   $(".clients__item-button:contains(hide)").each(function(){
    $(this).parent().find('a.btn__cms.btn-developers.w-button').hide();
    $(this).parent().find('.link__img.mb--20.w-inline-block').css('cursor', 'unset');
    $(this).parent().parent().find('> a.w-inline-block').css('cursor', 'unset');
  });
  $(".clients__item-button:contains(hide)").parent().find('.link__img.mb--20.w-inline-block').click(function(){
   return false;   
  });
  $(".clients__item-button:contains(hide)").parent().parent().find('> a.w-inline-block').click(function(){
    return false;   
   });
  });
