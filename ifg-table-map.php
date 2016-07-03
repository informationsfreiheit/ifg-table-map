<?php
/**
 * @package ifgtablemap
 * @version 1.0
 */
/*
Plugin Name: ifgtablemap
Description: ifgtablemap in yaml for http://informationsfreiheit.org/ubersicht/
Author: Klaus Mueller
Version: 1.0
Author URI: http://klml.de
*/

function ifgtablemapScript(){
    if( is_page( 'ubersicht' ) ) {
        wp_register_script( 'jquerytoolsleaflettablesorter', '//cdn.jsdelivr.net/g/jquery.tools@1.2.7,leaflet@0.7.2,tablesorter@2.16.1' , false, null, true);
        wp_register_script( 'ifgtablemapscript', plugin_dir_url() . 'ifg-table-map/js/ubersicht.js' , false, null, true);
        wp_enqueue_script('jquerytoolsleaflettablesorter');
        wp_enqueue_script('ifgtablemapscript');
    }
}
function ifgtablemapStyles() {
    if( is_page( 'ubersicht' ) ) {
        wp_register_style( 'leafletcss', '//cdn.jsdelivr.net/leaflet/0.7.2/leaflet.css' );
        wp_register_style( 'ifgtablemapstyles', plugin_dir_url() . 'ifg-table-map/ubersicht.css' ) ;
        wp_enqueue_style( 'leafletcss' );
        wp_enqueue_style( 'ifgtablemapstyles' );
    }
}
add_action( 'wp_enqueue_scripts', 'ifgtablemapStyles' );
add_action( 'wp_enqueue_scripts', 'ifgtablemapScript' );



function ifgtablemap( $atts, $content = 0 ) {
    $citys = yaml_parse( $content );

    $citycounter = 0;
    $bayernAllResident = 12691568 ;

    $bayernIfsResident = 0;
    
    $html = file_get_contents( plugin_dir_url() . 'ifg-table-map/table.html' )  ;


    foreach ($citys as $city) {
        // is city countable 
        $citycount = '' ;
        if ( $city['art'] != 'Ausarbeitung' && $city['art'] != 'ausserkraft') {
            $citycounter = $citycounter + 1;
            $citycount = $citycounter . '.' ;
            $bayernIfsResident = $bayernIfsResident + $city['resident'];  // TODO floating
        }
        ( $city['resident'] != 0 ) ? $cityresident = number_format( $city['resident'] , 0, '','.') : $cityresident = ' ' ;
        $cityname =  strtolower( str_replace(' ', '_', $city['name']) );         
        $html .= "
<tr id='$cityname' data-pos='$city[pos]' data-gemart='$city[art]' >
<td><a href='#$cityname'>$citycount</a></td>
<td class='name'><a href='$city[href]'><strong>$city[name]</strong> ($city[bez]) </a></td>
<td>$city[init]</td>
<td>$city[start]</td>
<td>$city[bemerkung]</td>
<td class='resident'>$cityresident</td>
<td class='satzlink'><a title='Direkt zur Satzung' href='$city[satzlink]'> </a></td>
</tr>";
    }
    $html .= "</tbody></table>
Derzeit haben " . number_format($bayernIfsResident, 0, '','.') . " (" .  round( $bayernIfsResident / $bayernAllResident * 100 , 0 )  . " %) Einwohner in Bayern Akteneinsichtsrecht gemäß kommunaler Informationsfreiheit im Bereich des eigenen Wirkungskreis der Gemeinden (Stand: " . date("Y-m-d") . ")." . $bayernAllResident ;

    return $html ;
}

remove_filter( 'the_content', 'wpautop' );
add_filter( 'the_content', 'wpautop' , 99);
add_filter( 'the_content', 'shortcode_unautop',100 );
add_shortcode( 'ifgtablemap', 'ifgtablemap' );