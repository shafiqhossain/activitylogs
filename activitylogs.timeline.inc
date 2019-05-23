<?php
// $Id: activitylogs.timeline.inc,v 1.0 2019/03/26 12:55:37 shafiq Exp $

/**
 * @file
 * Activity timeline
 */

/**
  * Display the timeline by type
  *
  */
function activitylogs_timeline($type='', $nid=0, $uid=0) {
  global $user;

  $timeline_variables = array('type' => $type, 'nid' => $nid, 'uid' => $uid);
  drupal_add_js(array('activitylogs' => $timeline_variables), 'setting');
	
  drupal_add_css(drupal_get_path('module', 'activitylogs').'/activitylogs.css');
  drupal_add_js(drupal_get_path('module', 'activitylogs').'/activitylogs.timeline.js');
  drupal_add_js(drupal_get_path('module', 'activitylogs').'/activitylogs.js', array(
    'defer' => true,
    'scope' => 'footer',
  ));

  $output = '<section class="cd-timeline js-cd-timeline">';
  $output .= '  <div class="cd-timeline__container" id="activitylogs-timelines">';
  $output .= '  </div>';
  $output .= '</section> <!-- cd-timeline -->';

  return $output;
}



?>