<template >
    <div class="support-link-container">
      <a href="https://www.buymeacoffee.com/bilgedemirkaya" class="support-link">Buy a coffee to the author</a>
    </div>
  </template>

<style>
.support-link-container {
    background: #fffdc027;
    margin-left: auto;
    border-radius: 10px;
    padding: 0.6rem;
}

.support-link {
  color: #ffe600b1; /* Gold color for the link */
  font-weight: bold;
  font-size: 1.2em;
  background: linear-gradient(45deg, #FFC0CB, #FFD700, #8A2BE2); /* Colorful gradient */
  -webkit-background-clip: text;
  background-clip: text;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.support-link:hover {
  transform: scale(1.1); /* Slightly enlarge on hover */
  text-shadow: 0px 0px 6px rgba(255,255,255,0.5); /* Add a subtle glow effect */
}</style>