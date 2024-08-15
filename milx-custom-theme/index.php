<?php
get_header(); // Include the header.php file
?>

<main id="main" class="site-main">
    <div id="primary" class="content-area">
        <div id="content" class="site-content" role="main">
            <h1>wordle clone by milx</h1>
            <?php
            // Display the Wordle clone using a shortcode
            echo do_shortcode('[wordle_clone]');
            ?>
        </div><!-- #content -->
    </div><!-- #primary -->
</main><!-- #main -->

<?php
get_footer(); // Include the footer.php file
?>

