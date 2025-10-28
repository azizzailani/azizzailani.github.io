// Structured Data (JSON-LD) for SEO
function initStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Abdul Aziz Zailani",
    jobTitle: "Senior DevOps Engineer & SRE",
    description:
      "Professional DevOps Engineer specializing in CI/CD, Cloud Infrastructure, and Automation. 5+ years experience in optimizing deployment pipelines and improving system reliability.",
    url: "https://azizzailani.github.io",
    email: "aazizzailani.dev@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "ID",
      addressRegion: "Indonesia",
    },
    sameAs: [
      "https://github.com/azizzailani",
      "https://linkedin.com/in/aazizzailani",
      "https://dev.to/azizzailani",
    ],
    knowsAbout: [
      "DevOps",
      "Site Reliability Engineering",
      "CI/CD",
      "Kubernetes",
      "Docker",
      "AWS",
      "Terraform",
      "Ansible",
      "Monitoring",
      "Cloud Automation",
    ],
    alumniOf: "PT. Komunitas Anak Bangsa",
    hasOccupation: {
      "@type": "Occupation",
      name: "Senior DevOps Engineer",
      description:
        "Leading infrastructure automation, CI/CD pipeline optimization, and system reliability engineering",
    },
  };

  // Add Organization Schema
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Abdul Aziz Zailani - DevOps Portfolio",
    url: "https://azizzailani.github.io",
    logo: "https://azizzailani.github.io/assets/images/logo.png",
    description:
      "Professional portfolio showcasing DevOps engineering expertise in CI/CD, Cloud Infrastructure, and Automation",
  };

  // Add both schemas to the page
  const personScript = document.createElement("script");
  personScript.type = "application/ld+json";
  personScript.text = JSON.stringify(structuredData);
  document.head.appendChild(personScript);

  const orgScript = document.createElement("script");
  orgScript.type = "application/ld+json";
  orgScript.text = JSON.stringify(organizationData);
  document.head.appendChild(orgScript);
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initStructuredData);
