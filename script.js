document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('myAudio');
  const playPauseButton = document.getElementById('playPauseButton');
  const circle = document.querySelector('.circle'); // Select the disc element
  const navLinks = document.querySelectorAll('.nav-link');
  const submenu = document.getElementById('submenu');
  const submenuLinks = document.querySelectorAll('.submenu-link');
  const sections = document.querySelectorAll('section'); // Select all sections
  const aboutSection = document.getElementById('about');

  // Set initial state (Corrected)
  if (audio.paused) {
    circle.style.animationPlayState = 'paused'; // Pause the animation if the music is paused
    playPauseButton.textContent = 'Play Song'; // Set button text to "Play Song"
  } else {
    circle.style.animationPlayState = 'running'; // Start the animation if the music is playing
    playPauseButton.textContent = 'Pause Song'; // Set button text to "Pause Song"
  }

  // Play/Pause Button Functionality
  playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      circle.style.animationPlayState = 'running'; // Start the animation
      playPauseButton.textContent = 'Pause Song';
    } else {
      audio.pause();
      circle.style.animationPlayState = 'paused'; // Pause the animation
      playPauseButton.textContent = 'Play Song';
    }
  });

  // Navigation and Submenu Functionality
  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      targetElement.scrollIntoView({ behavior: 'smooth' });

      // Update active link
      navLinks.forEach(navLink => navLink.classList.remove('active'));
      link.classList.add('active');

      // Show/hide submenu based on the clicked link
      if (targetId === '#about') {
        submenu.classList.add('show');
      } else {
        submenu.classList.remove('show');
      }
    });
  });

  // Submenu link click handling
  submenuLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      targetElement.scrollIntoView({ behavior: 'smooth' });

      // Update active submenu link 
      submenuLinks.forEach(submenuLink => submenuLink.classList.remove('active')); 
      link.classList.add('active');

      // Hide all about-content sections
      const aboutContentSections = document.querySelectorAll('.about-content');
      aboutContentSections.forEach(section => section.classList.remove('active'));

      // Show the clicked about-content section
      targetElement.classList.add('active');
    });
  });

  // Combined Scroll Event Listener
  window.addEventListener('scroll', () => {
    const aboutSectionTop = aboutSection.offsetTop;
    const aboutSectionHeight = aboutSection.offsetHeight;

    // Main button active state change
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        const correspondingLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
        if (correspondingLink) {
          correspondingLink.classList.add('active');
        }
      }
    });

    // Submenu show/hide logic
    if (window.pageYOffset >= aboutSectionTop && window.pageYOffset < aboutSectionTop + aboutSectionHeight) {
      submenu.classList.add('show');
    } else {
      submenu.classList.remove('show');
    }
  });
});
