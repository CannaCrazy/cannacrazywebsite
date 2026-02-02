<?php
/**
 * FAQ Section Template Part
 * 
 * @package CannaCrazy
 */
?>

<section id="faq" class="py-20 px-6 bg-[#0a0a0a]" style="padding: 5rem 1.5rem; background-color: #0a0a0a;">
    <div style="max-width: 1536px; margin: 0 auto;">
        <div class="flex items-end gap-6 mb-16" style="display: flex; align-items: flex-end; gap: 1.5rem; margin-bottom: 4rem;">
            <h2 style="font-size: clamp(3rem, 6vw, 8rem); color: white; font-family: 'Permanent Marker', cursive;">
                <?php esc_html_e('FAQ & FACTS', 'cannacrazy'); ?>
            </h2>
            <div class="hidden md:block" style="margin-bottom: 1rem; color: #39FF14; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; animation: pulse 2s infinite;">
                [ <?php esc_html_e('KNOWLEDGE BASE', 'cannacrazy'); ?> ]
            </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem;">
            <!-- FAQ Accordion -->
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <h3 style="font-size: 1.5rem; font-family: 'Permanent Marker', cursive; margin-bottom: 1.5rem; color: #BC13FE;">
                    <?php esc_html_e('Common Questions', 'cannacrazy'); ?>
                </h3>
                <?php
                $faqs = array(
                    array(
                        'q' => __('How do I become a member?', 'cannacrazy'),
                        'a' => __('Membership is open to all cannabis enthusiasts over 21. Just sign up online or visit us in-store to join the fam. We verify ID at the door, every time.', 'cannacrazy')
                    ),
                    array(
                        'q' => __('Is the lounge open to the public?', 'cannacrazy'),
                        'a' => __('Yes, our social lounge is open daily from 10am to 10pm. However, during member-only events (usually Friday nights), access is restricted to Gold card holders.', 'cannacrazy')
                    ),
                    array(
                        'q' => __('Do you deliver?', 'cannacrazy'),
                        'a' => __('Currently, we operate on a pre-order and pickup model. You can reserve your stash online and grab it at our express counter. Delivery coming late 2026.', 'cannacrazy')
                    ),
                    array(
                        'q' => __('What payment methods do you accept?', 'cannacrazy'),
                        'a' => __('Cash is king. We also accept debit cards with a PIN for a small convenience fee. We are working on crypto payments.', 'cannacrazy')
                    ),
                    array(
                        'q' => __('Are the genetics really exclusive?', 'cannacrazy'),
                        'a' => __('100%. We work directly with small-batch craft growers. Many of the strains you see here are grown specifically for CannaCrazy and can\'t be found anywhere else.', 'cannacrazy')
                    ),
                );

                foreach ($faqs as $index => $faq):
                ?>
                <div class="faq-item" style="border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 1rem; overflow: hidden; background-color: #111; transition: all 0.3s ease;">
                    <button 
                        class="faq-question" 
                        onclick="this.parentElement.classList.toggle('active')"
                        style="width: 100%; text-align: left; padding: 1.5rem; display: flex; align-items: center; justify-content: space-between; background: none; border: none; color: white; cursor: pointer; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; font-size: 1.125rem;"
                    >
                        <span><?php echo esc_html($faq['q']); ?></span>
                        <span class="faq-icon" style="font-size: 1.5rem; color: #6b7280; transition: all 0.3s ease;">+</span>
                    </button>
                    <div class="faq-answer" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease;">
                        <div style="padding: 0 1.5rem 1.5rem; color: #9ca3af; line-height: 1.8; border-top: 1px solid rgba(255, 255, 255, 0.05);">
                            <?php echo esc_html($faq['a']); ?>
                        </div>
                    </div>
                </div>
                <?php endforeach; ?>

                <style>
                    .faq-item.active .faq-answer {
                        max-height: 500px;
                    }
                    .faq-item.active .faq-icon {
                        transform: rotate(45deg);
                        color: #39FF14;
                    }
                    .faq-item:hover {
                        border-color: rgba(255, 255, 255, 0.3);
                    }
                    .faq-question:hover .faq-icon {
                        color: #39FF14;
                    }
                </style>
            </div>

            <!-- Fun Facts -->
            <div style="background-color: #1a1a1a; border-radius: 3rem; padding: 2.5rem; border: 1px solid rgba(255, 255, 255, 0.1); position: relative; overflow: hidden;">
                <div style="position: absolute; top: 0; right: 0; padding: 2rem; opacity: 0.05; font-size: 9rem;">💡</div>
                <h3 style="font-size: 1.5rem; font-family: 'Permanent Marker', cursive; margin-bottom: 2rem; color: #FBFF00;">
                    <?php esc_html_e('Did You Know?', 'cannacrazy'); ?>
                </h3>
                <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                    <?php
                    $facts = array(
                        __('Did you know eating mango 45 minutes before smoking can intensify and extend your high? The myrcene does the magic! 🥭', 'cannacrazy'),
                        __('The term "420" came from a group of California high school students who met at 4:20pm to search for an abandoned cannabis crop.', 'cannacrazy'),
                        __('Chocolate and weed both release anandamide in your brain—the "bliss molecule". Together? Next level vibes. 🍫', 'cannacrazy'),
                        __('Shakespeare\'s pipes contained traces of cannabis. The Bard was definitely elevated when he wrote those sonnets.', 'cannacrazy'),
                        __('Bhutan was the last country to ban cannabis... in 2004. Before that, it was literally just pig food.', 'cannacrazy'),
                    );

                    $counter = 1;
                    foreach ($facts as $fact):
                    ?>
                    <div style="display: flex; gap: 1rem; align-items: flex-start;">
                        <span style="color: #39FF14; font-weight: bold; font-size: 1.125rem;">0<?php echo $counter; ?>.</span>
                        <p style="color: #d1d5db; line-height: 1.8;">
                            <?php echo esc_html($fact); ?>
                        </p>
                    </div>
                    <?php 
                    $counter++;
                    endforeach; 
                    ?>
                </div>
            </div>
        </div>
    </div>
</section>
