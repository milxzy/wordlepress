<?php
/*
Plugin Name: Wordle Clone
Description: A simple Wordle clone integrated into WordPress.
Version: 1.0
Author: Miles Collins
*/

// Enqueue scripts and styles
function wordle_clone_enqueue_scripts() {
    wp_enqueue_style('wordle-clone-style', plugin_dir_url(__FILE__) . 'style.css');
    wp_enqueue_script('wordle-clone-script', plugin_dir_url(__FILE__) . 'script.js', array('jquery'), null, true);
}
add_action('wp_enqueue_scripts', 'wordle_clone_enqueue_scripts');

// Register shortcode
function wordle_clone_shortcode() {
    ob_start();
    ?>
    <div id="wordle-clone">
        <h1>guess the word</h1>
        <form id="guess-form">
            <input type="text" id="guess" required>
            <button type="submit">submit guess</button>
        </form>
        <div id="feedback-container" class="feedback"></div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('wordle_clone', 'wordle_clone_shortcode');
?>
