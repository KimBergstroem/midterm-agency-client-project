// API used for GET requests. Free of use and provided by IronHack Bootcamp for testing purpose.
//"https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects"

//--------------------
//--------------------
//--------------------

// API endpoint for fetching project data
const GET_ENDPOINT =
  "https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects";

/**
 * Fetches project data from the specified API endpoint.
 * @returns {Array} - An array containing project data.
 */
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

/**
 * Fetches and renders project data.
 */
const projectPosts = async () => {
  try {
    const projectData = await fetchProjectData();
    renderProjectCards(projectData);

    // Get the UUID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");

    if (uuid) {
      fetchProjectDataByUUID(uuid, projectData);
    }
  } catch (error) {
    console.error(error.message);
  }
};

/**
 * Renders project cards on the page.
 * @param {Array} projectData - An array containing project data.
 */
const renderProjectCards = (projectData) => {
  // Shuffle the projectData array
  const shuffledProjects = projectData.sort(() => Math.random() - 0.5);
  const randomProjects = shuffledProjects.slice(0, 3);
  const projectContainer = document.querySelector(".project__container");
  projectContainer.innerHTML = "";

  // Render the selected random project
  for (const project of randomProjects) {
    const projectCardHTML = createProjectCardHTML(project);
    projectContainer.insertAdjacentHTML("beforeend", projectCardHTML);
  }
};

/**
 * Creates HTML template for a project card.
 * @param {Object} project - The project object containing project details.
 * @returns {string} - HTML string for the project card.
 */
const createProjectCardHTML = (project) => {
  return `
    <div class="project__card">
      <img src="${project.image}" alt="Project Card Image" />
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <a href="./project.html?uuid=${project.uuid}">Learn More</a>
    </div>
  `;
};

/**
 * Fetches project data based on UUID parameter.
 * @param {string} uuid - The UUID of the project to fetch.
 * @param {Array} allProjects - An array containing all project data.
 */
const fetchProjectDataByUUID = async (uuid, allProjects) => {
  try {
    const project = allProjects.find((proj) => proj.uuid === uuid);
    if (!project) {
      throw new Error(`Project with UUID ${uuid} not found`);
    }
    createProjectDetailPageHTML(project);
  } catch (error) {
    console.error(error.message);
  }
};

/**
 * Creates HTML for project detail page.
 * @param {Object} project - The project object containing project details.
 */
const createProjectDetailPageHTML = (project) => {
  const projectDetailWrapper = document.getElementById(
    "project-detail__wrapper"
  );
  projectDetailWrapper.innerHTML = `
      <div class="project-detail__title">
        <h1>${project.name}</h1>
        <div class="project-detail__subtitle">
          <h2>${project.description}</h2>
          <h3>Completed on ${project.completed_on}</h3>
        </div>
        <div class="project-detail__img-container">
          <img src="${project.image}" alt="Project Detail Header Image" />
        </div>
        <div class="project-detail__container">
          ${project.content}
        </div>
      </div>
    `;
};

// Event listener to trigger fetching and rendering of project data when the page loads
window.addEventListener("load", projectPosts);
