import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract header and footer parts
head_nav = html.split('<!-- ═══════════════ HERO ══════════════════════════════ -->')[0]
footer_scripts = '<!-- ═══════════════ FOOTER ═══════════════════════════ -->' + html.split('<!-- ═══════════════ FOOTER ═══════════════════════════ -->')[1]

# Extract specific sections to reuse
digital_gaming = '<!-- ═══════════════ DIGITAL GAMING ══════════════════ -->' + html.split('<!-- ═══════════════ DIGITAL GAMING ══════════════════ -->')[1].split('<!-- ═══════════════ MARQUEE #2 (BLUE) ═══════════════ -->')[0]
table_sports = '<!-- ═══════════════ TABLE SPORTS ════════════════════ -->' + html.split('<!-- ═══════════════ TABLE SPORTS ════════════════════ -->')[1].split('<!-- ═══════════════ CONTACT ══════════════════════════ -->')[0]
contact_section = '<!-- ═══════════════ CONTACT ══════════════════════════ -->' + html.split('<!-- ═══════════════ CONTACT ══════════════════════════ -->')[1].split('<!-- ═══════════════ FOOTER ═══════════════════════════ -->')[0]

# --- 1. HOME PAGE (index.html) ---
# Keep index as is, maybe just remove some things, but it's fine as the overview page.

# --- 2. GAMES PAGE (games.html) ---
games_hero = """
<section id="hero" style="min-height: 50vh;">
  <div class="hero-bg" style="background-image: url('https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=1920&q=80'); filter: brightness(0.3) saturate(1.5);"></div>
  <div class="hero-content" style="padding-top: 10rem;">
    <h1 class="hero-title"><span class="t-red">Digital</span> <span class="t-blue">Experiences</span></h1>
    <p class="hero-sub">Immerse yourself in next-gen virtual reality and console gaming.</p>
  </div>
</section>
"""
with open('games.html', 'w', encoding='utf-8') as f:
    f.write(head_nav + games_hero + digital_gaming + footer_scripts)


# --- 3. TABLE SPORTS PAGE (table-sports.html) ---
table_hero = """
<section id="hero" style="min-height: 50vh;">
  <div class="hero-bg" style="background-image: url('https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=1920&q=80'); filter: brightness(0.3) saturate(1.5);"></div>
  <div class="hero-content" style="padding-top: 10rem;">
    <h1 class="hero-title"><span class="t-blue">Table</span> <span class="t-red">Sports</span></h1>
    <p class="hero-sub">Classic physical games for friends and family.</p>
  </div>
</section>
"""
with open('table-sports.html', 'w', encoding='utf-8') as f:
    f.write(head_nav + table_hero + table_sports + footer_scripts)


# --- 4. ABOUT PAGE (about.html) ---
about_content = """
<section id="hero" style="min-height: 50vh;">
  <div class="hero-bg" style="background-image: url('https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=1920&q=80'); filter: brightness(0.3) saturate(1.5);"></div>
  <div class="hero-content" style="padding-top: 10rem;">
    <h1 class="hero-title"><span class="t-red">About</span> <span class="t-blue">3Dline</span></h1>
    <p class="hero-sub">The Ultimate Gaming Destination in Beeramguda</p>
  </div>
</section>

<section class="section">
  <div class="section-hdr reveal">
    <p class="section-tag t-blue">// OUR MISSION //</p>
    <h2 class="section-title">WHY <span class="accent-red">CHOOSE US</span></h2>
    <div class="divider"></div>
  </div>
  
  <div class="contact-inner reveal" style="text-align: left;">
    <p class="card-desc" style="font-size: 1.1rem; margin-bottom: 2rem;">At 3Dline VR Gaming Hub, we are passionate about bringing the future of entertainment to Beeramguda, Hyderabad. We provide a premium, high-energy environment where gamers of all ages can experience the latest in Virtual Reality, high-end PS5 console gaming, and heart-pounding racing simulators.</p>
    
    <p class="card-desc" style="font-size: 1.1rem; margin-bottom: 2rem;">Not into digital screens? We've got you covered with our top-of-the-line physical table sports, including professional-grade Pool, fast-paced Foosball, and intense Air Hockey.</p>
    
    <h3 class="card-name" style="margin-top: 3rem; margin-bottom: 1rem; color: var(--blue);">FREQUENTLY ASKED QUESTIONS</h3>
    
    <div style="margin-bottom: 1.5rem; border-left: 3px solid var(--red); padding-left: 1rem;">
      <h4 style="font-family: var(--ff-sub); font-size: 1.2rem; color: #fff;">Do I need to book in advance?</h4>
      <p class="card-desc">While walk-ins are welcome, we highly recommend booking in advance, especially on weekends, to secure your VR station or Pool table.</p>
    </div>

    <div style="margin-bottom: 1.5rem; border-left: 3px solid var(--blue); padding-left: 1rem;">
      <h4 style="font-family: var(--ff-sub); font-size: 1.2rem; color: #fff;">Will VR make me motion sick?</h4>
      <p class="card-desc">Our high-end VR headsets have excellent refresh rates that minimize motion sickness. We also offer stationary experiences perfect for beginners!</p>
    </div>

    <div style="margin-bottom: 1.5rem; border-left: 3px solid var(--red); padding-left: 1rem;">
      <h4 style="font-family: var(--ff-sub); font-size: 1.2rem; color: #fff;">Do you host birthday parties?</h4>
      <p class="card-desc">Yes! 3Dline is the perfect venue for parties and corporate events. Contact us for special group rates and packages.</p>
    </div>
  </div>
</section>
"""
with open('about.html', 'w', encoding='utf-8') as f:
    f.write(head_nav + about_content + footer_scripts)


# --- 5. CONTACT PAGE (contact.html) ---
contact_hero = """
<section id="hero" style="min-height: 50vh;">
  <div class="hero-bg" style="background-image: url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80'); filter: brightness(0.2) saturate(1.2);"></div>
  <div class="hero-content" style="padding-top: 10rem;">
    <h1 class="hero-title"><span class="t-red">Book</span> <span class="t-blue">Your Session</span></h1>
    <p class="hero-sub">Get in touch or visit us in Beeramguda, Hyderabad.</p>
  </div>
</section>

<section class="section" style="display: flex; flex-wrap: wrap; gap: 2rem; justify-content: center; max-width: 1200px; margin: 0 auto;">
  <div class="game-card" style="flex: 1; min-width: 300px; padding: 2rem; opacity: 1; transform: none;">
    <h3 class="card-name" style="font-size: 1.5rem; margin-bottom: 1.5rem; color: var(--red);">Send a Request</h3>
    <form style="display: flex; flex-direction: column; gap: 1.2rem;">
      <input type="text" placeholder="Your Name" style="padding: 1rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; font-family: var(--ff-body); outline: none;">
      <input type="email" placeholder="Your Email" style="padding: 1rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; font-family: var(--ff-body); outline: none;">
      <select style="padding: 1rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; font-family: var(--ff-body); outline: none;">
        <option style="color: black;">Select Experience</option>
        <option style="color: black;">VR Gaming</option>
        <option style="color: black;">PS5 Session</option>
        <option style="color: black;">Car Simulator</option>
        <option style="color: black;">Table Sports (Pool/Foosball)</option>
        <option style="color: black;">Party Booking</option>
      </select>
      <input type="date" style="padding: 1rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; font-family: var(--ff-body); outline: none; color-scheme: dark;">
      <button type="button" class="btn-cta visible" style="border: none; justify-content: center; width: 100%; margin-top: 1rem;">SUBMIT REQUEST</button>
    </form>
  </div>
  
  <div style="flex: 1; min-width: 300px;">
"""
contact_end = """
  </div>
</section>
"""
with open('contact.html', 'w', encoding='utf-8') as f:
    f.write(head_nav + contact_hero + contact_section + contact_end + footer_scripts)

print("Created 5 pages successfully.")
