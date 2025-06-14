<template>
  <div class="about-page">
    <h1 class="title">About Our Project</h1>

    <p class="intro">
      We are Barak Tubul and Nofar, students of Information Systems Engineering at Ben-Gurion University.
      This project was created as part of our Internet Development Environments course.
    </p>


    <p class="details">
      Our goal was to create a modern and user-friendly recipe management platform. Through this project,
      we applied our knowledge in frontend and backend technologies, UX design, and full-stack development.
    </p>

    <h2 class="sub-title">Previous Projects</h2>
    <div class="projects">
      <a href="https://wed-2023.github.io/313557969/" target="_blank">Exercise 1(Barak)</a>
      <a href="https://wed-2023.github.io/211648126/" target="_blank">Exercise 1(Nofar)</a>
      <a href="https://wed-2023.github.io/assignment2-211648126_313557969_assignment2/" target="_blank">Exercise 2</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>

<style scoped>
.about-page {
  position: relative;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 400px;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.intro,
.details {
  font-size: 1.2rem;
  margin-bottom: 20px;
  line-height: 1.6;
}

.sub-title {
  font-size: 1.5rem;
  margin-top: 30px;
  margin-bottom: 15px;
}

.projects {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px 24px;
  margin-top: 10px;
}

.projects a {
  color: #007bff;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
}

.projects a:hover {
  text-decoration: underline;
}
</style>
