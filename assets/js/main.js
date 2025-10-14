/* ===================================================================

    Author          : Valid Theme
    Template Name   : Dixor - Creative Digital Agency Template
    Version         : 1.0 (Optimized)

* ================================================================= */
(function($) {
	"use strict";

	$(document).ready(function() {

		/* ==================================================
		    # Dark Mode Toggle with System Preference & Session Storage
		===============================================*/
		// Check if user has manually selected a theme in this session
		var userThemeChoice = sessionStorage.getItem('userThemeChoice');

		if (userThemeChoice !== null) {
			// User has made a manual choice - use that
			if (userThemeChoice === 'dark') {
				$("body").addClass("bg-dark");
				$(".radio-inner").addClass("active");
			} else {
				$("body").removeClass("bg-dark");
				$(".radio-inner").removeClass("active");
			}
		} else {
			// No manual choice - follow system preference
			if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
				$("body").addClass("bg-dark");
				$(".radio-inner").addClass("active");
			}
		}

		// Listen for system theme changes (only if user hasn't made a manual choice)
		if (window.matchMedia) {
			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
				// Only auto-switch if user hasn't manually selected a theme
				if (sessionStorage.getItem('userThemeChoice') === null) {
					if (e.matches) {
						$("body").addClass("bg-dark");
						$(".radio-inner").addClass("active");
					} else {
						$("body").removeClass("bg-dark");
						$(".radio-inner").removeClass("active");
					}
				}
			});
		}

		$(".radio-btn").on("click", function() {
            $(".radio-inner").toggleClass("active");
            $("body").toggleClass("bg-dark");

			// Save user's manual choice to session storage
			var isDark = $("body").hasClass("bg-dark");
			sessionStorage.setItem('userThemeChoice', isDark ? 'dark' : 'light');
        })

		$(".radio-btn-light").on("click", function() {
            $(".radio-inner-light").toggleClass("active");
            $("body").toggleClass("bg-dark");

			// Save user's manual choice to session storage
			var isDark = $("body").hasClass("bg-dark");
			sessionStorage.setItem('userThemeChoice', isDark ? 'dark' : 'light');
        })


		/* ==================================================
		    Contact Form - AJAX FormSubmit Integration
		================================================== */
		$('.contact-form').each(function() {
			var formInstance = $(this);
			formInstance.submit(function(e) {
				e.preventDefault(); // Prevent default form submission

				var $form = $(this);
				var $submitBtn = $('#submit');
				var formData = $form.serialize();

				// Show loader
				$submitBtn
					.after('<span class="form-loader"></span>')
					.attr('disabled', 'disabled');

				// Remove any previous messages
				$('.form-result').remove();

				// AJAX submission
				$.ajax({
					url: $form.attr('action'),
					method: 'POST',
					data: formData,
					dataType: 'json',
					success: function(response) {
						// Remove loader
						$('.form-loader').remove();
						$submitBtn.removeAttr('disabled');

						// Show success message
						$form.before('<div class="form-result alert alert-success">Thank you! Your form has been submitted successfully.</div>');

						// Reset form
						$form[0].reset();
						syncOptions(); // Reset select options

						// Remove success message after 5 seconds
						setTimeout(function() {
							$('.form-result').fadeOut(function() {
								$(this).remove();
							});
						}, 5000);
					},
					error: function(xhr) {
						// Remove loader
						$('.form-loader').remove();
						$submitBtn.removeAttr('disabled');

						// Show error message
						$form.before('<div class="form-result alert alert-danger">An error occurred. Please try again.</div>');

						// Remove error message after 5 seconds
						setTimeout(function() {
							$('.form-result').fadeOut(function() {
								$(this).remove();
							});
						}, 5000);
					}
				});

				return false;
			});
		});



        // Select - Auto-populate project choices
        // 1) Get project titles from the item blocks
        var titles = [];
        $('.item-move-top-item .item-title h3').each(function () {
            var txt = $(this).text();
            if (txt) {
                txt = $.trim(txt);
                if (txt.length) titles.push(txt);
            }
        });

        // 2) Target form selects
        var $form = $('.contact-form');
        var $selects = $form.find('#choice1, #choice2, #choice3');

        // 3) Fill each select while keeping the existing placeholder (1st option)
        $selects.each(function () {
            var $sel = $(this);
            var $placeholder = $sel.find('option').first().clone();
            $sel.empty().append($placeholder);

            for (var i = 0; i < titles.length; i++) {
                $('<option>', { value: titles[i], text: titles[i] }).appendTo($sel);
            }
        });

        // 4) Prevent duplicates between selects
        function syncOptions() {
            // Get chosen values (non-empty)
            var chosen = {};
            $selects.each(function () {
                var v = $(this).val();
                if (v && v.length) chosen[v] = true;
            });

            // For each select, disable options chosen elsewhere
            $selects.each(function () {
                var currentVal = $(this).val();
                $(this).find('option').each(function () {
                    var val = $(this).val();
                    if (!val) return; // ignore placeholder
                    // Disable if selected elsewhere AND not the current value of this select
                    var disable = (chosen[val] && val !== currentVal) ? true : false;
                    $(this).prop('disabled', disable);
                });
            });
        }

        $selects.on('change', syncOptions);
        syncOptions(); // init


	}); // end document ready function

	$(window).on('load', function(event) {
		$('#preloader').delay(500).fadeOut(500);
	});



})(jQuery); // End jQuery
