<?php
function my_custom_theme_enqueue_styles() {
    wp_enqueue_style('style', get_stylesheet_uri());
}
add_action('wp_enqueue_scripts', 'my_custom_theme_enqueue_styles');



