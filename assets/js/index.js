// API used for GET requests. Free of use and provided by IronHack Bootcamp for testing purpose.
//"https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects"

//--------------------
//--------------------
//--------------------

// API endpoint for fetching project data
const GET_ENDPOINT =
  "https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects";

// Fetch data from API
const fetchProjectData = async () => {
  try {
    const response = await fetch(GET_ENDPOINT);
    if (!response.ok) {
      throw new Error(`Failed to fetch project data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error.message);
    return []; // Return empty array if an error occurs
  }
};

// Create HTML template for a project card
const createProjectCardHTML = (project) => {
  return `
    <div class="project__card">
      <img src="${project.image}" alt="Project Card Image" />
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <a href="project.html">Learn More</a>
    </div>
  `;
};

// Render project cards in the DOM
const renderProjectCards = (projectData) => {
  const projectContainer = document.querySelector(".project__container");
  for (const project of projectData.slice(1, 4)) {
    const projectCardHTML = createProjectCardHTML(project);
    projectContainer.insertAdjacentHTML("beforeend", projectCardHTML);
  }
};

// Function to initialize fetching and rendering of project data
const projectPosts = async () => {
  const projectData = await fetchProjectData();
  renderProjectCards(projectData);
};

window.addEventListener("load", projectPosts);
