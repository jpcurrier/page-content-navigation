/*! Page Content Navigation 1.0.0 | MIT *
 * https://github.com/jpcurrier/page-content-navigation !*/
( function( $ ){
  $.fn.contentNavigation = function( options ){

    // default options
    var settings = $.extend({
      includeTopNav: false,
      offsetIndicator: 0
    }, options );

    // create nav
    var contents = this,
      jumps = settings.includeTopNav ? '<li class="on"></li>' : '';
    for( var i = 0; i < contents.length; i++ ){
      if( !settings.includeTopNav && i === 0 )
        jumps += '<li class="on"></li>';
      else
        jumps += '<li></li>';
    }
    $( 'body' ).append( '<ul class="content-navigation">' + jumps + '</ul>' );

    // interaction
    $( document ).on( 'click', '.content-navigation > li', function(){
      var i = $( this ).index();
      if( settings.includeTopNav && $( this ).index() === 0 )
        var jumpTo = 0;
      else if( settings.includeTopNav )
        var jumpTo = Math.ceil( $( contents[ i - 1 ] ).offset().top );
      else
        var jumpTo = Math.ceil( $( contents[ i ] ).offset().top );

      $( 'html, body' ).animate(
        { scrollTop: jumpTo },
        400
      );
    } );

    // indicators
    function jumpIndex(){
      var scroll = $( window ).scrollTop(),
        atBottom = true;

      if( typeof settings.offsetIndicator === 'string' && settings.offsetIndicator.indexOf( '%' ) > -1 ){
        var offsetIndicator = settings.offsetIndicator.replace( /%/g, '' ).trim(), // remove %
          posDecimal =
            settings.offsetIndicator.indexOf( '.' ) > -1 ?
              settings.offsetIndicator.indexOf( '.' ) - 2 :
                offsetIndicator.length - 2;
        offsetIndicator = offsetIndicator.replace( /\./g, '' ); // remove .
        if( posDecimal > -1 )
          offsetIndicator = Number( offsetIndicator.slice( 0, posDecimal ) + '.' + offsetIndicator.slice( posDecimal ) );
        else{
          if( offsetIndicator.slice( 0, 1 ) == '-' ){
            var natural = offsetIndicator.slice( 1 ),
              sign = '-';
            posDecimal -= 1;
          }
          else{
            var natural = offsetIndicator,
              sign = '';
          }
          offsetIndicator = Number( sign + '0.' + String( Math.pow( 10, ( 0 - posDecimal ) ) ).slice( 1 ) + natural );
        }
        offsetIndicator *= $( window ).height();
      }
      else
        var offsetIndicator = Number( settings.offsetIndicator );

      contents.each( function( i ){
        if( scroll < $( this ).offset().top + offsetIndicator ){
          var j =
            !settings.includeTopNav && i - 1 >= 0 ?
              i - 1 :
                i;
          $( '.content-navigation > li' ).eq( j ).not( '.on' ).addClass( 'on' )
            .siblings( '.on' ).removeClass( 'on' );
          atBottom = false;

          return false;
        }
      } );
      if( atBottom )
        $( '.content-navigation > li:last-child' ).not( '.on' ).addClass( 'on' )
          .siblings( '.on' ).removeClass( 'on' );
    }
    $( window ).on( 'resize', jumpIndex );
    $( window ).on( 'scroll', jumpIndex );
  };
} )( jQuery );