function createProjectLink(url, label) {
  const link = document.createElement("a");
  link.href = url;
  link.textContent = label;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  return link;
}

function createProjectCard(project, index) {
  const card = document.createElement("article");
  card.className = "project-card";
  card.id = project.slug;

  const imageContainer = document.createElement("div");
  imageContainer.className = "project-image";

  const image = document.createElement("img");
  image.src = project.image;
  image.alt = `Imagem do projeto ${project.name}`;
  image.loading = "lazy";
  imageContainer.appendChild(image);

  const content = document.createElement("div");
  content.className = "project-content";

  const number = document.createElement("span");
  number.className = "project-number";
  number.textContent = `${String(index + 1).padStart(2, "0")} / PROJETO`;

  const status = document.createElement("span");
  status.className = "project-status";
  if (project.status === "Em desenvolvimento") {
    status.classList.add("progress");
  }
  status.textContent = project.status;

  const title = document.createElement("h3");
  title.textContent = project.name;

  const description = document.createElement("p");
  description.textContent = project.description;

  const tags = document.createElement("div");
  tags.className = "project-tags";
  project.technologies.forEach((technology) => {
    const tag = document.createElement("span");
    tag.textContent = technology;
    tags.appendChild(tag);
  });

  const links = document.createElement("div");
  links.className = "project-links";
  if (project.demo) {
    links.appendChild(createProjectLink(project.demo, "Ver projeto"));
  }
  if (project.github) {
    links.appendChild(createProjectLink(project.github, "GitHub"));
  }

  content.append(number, status, title, description, tags, links);
  card.append(imageContainer, content);
  return card;
}

async function loadProjects() {
  const container = document.querySelector(".projects-grid");

  try {
    const response = await fetch("./src/data/projects.json");
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const projects = await response.json();
    const featuredProjects = projects.filter((project) => project.featured !== false);

    featuredProjects.forEach((project, index) => {
      container.appendChild(createProjectCard(project, index));
    });
    document.getElementById("projectCount").textContent = featuredProjects.length;
  } catch (error) {
    console.error("Não foi possível carregar os projetos:", error);

    const message = document.createElement("p");
    message.textContent = "Não foi possível carregar os projetos no momento.";
    message.setAttribute("role", "status");
    container.appendChild(message);
  }
}
