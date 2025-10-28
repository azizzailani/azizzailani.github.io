/**
 * Terminal Content Templates
 * Contains all terminal content generation methods
 *
 * @class TerminalContentTemplates
 * @version 1.0.0
 */
class TerminalContentTemplates {
  /**
   * Get About Me content
   * @returns {string} HTML content
   */
  static getAboutContent() {
    return `
      <h1>$ whoami</h1>
      <p><strong>Name:</strong> Abdul Aziz Zailani</p>
      <p><strong>Role:</strong> Senior DevOps Engineer & SRE</p>
      <p><strong>Focus:</strong> CI/CD, Cloud Infrastructure, Automation</p>
      <p><em>Transforming infrastructure chaos into orchestrated harmony</em></p>
      <h2>$ cat journey.txt</h2>
      <p>5+ years automating deployments and building reliable systems.</p>
    `;
  }

  /**
   * Get Experience content
   * @returns {string} HTML content
   */
  static getExperienceContent() {
    return `
      <h1>$ experience.log</h1>
      <h2>2022 - Present</h2>
      <p><strong>Senior DevOps Engineer</strong> @ PT. Komunitas Anak Bangsa</p>
      <ul>
        <li>CI/CD pipeline optimization</li>
        <li>Infrastructure as Code with Terraform</li>
        <li>Kubernetes orchestration</li>
      </ul>
      <h2>2019 - 2022</h2>
      <p><strong>DevOps Engineer</strong> @ Harmonix</p>
      <ul>
        <li>Docker containerization</li>
        <li>Monitoring setup with Prometheus</li>
        <li>Automation scripting</li>
      </ul>
    `;
  }

  /**
   * Get Skills content
   * @returns {string} HTML content
   */
  static getSkillsContent() {
    return `
      <h1>$ cat skills.txt</h1>
      <h2>CI/CD & Automation</h2>
      <p>Jenkins | GitLab CI | GitHub Actions | Ansible</p>
      <h2>Cloud & Infrastructure</h2>
      <p>AWS | Alibaba Cloud | Kubernetes | Docker</p>
      <h2>Monitoring & Observability</h2>
      <p>Prometheus | Grafana | ELK Stack | Loki</p>
      <h2>Programming</h2>
      <p>Python | Go | Bash | YAML</p>
    `;
  }

  /**
   * Get Contact content
   * @returns {string} HTML content
   */
  static getContactContent() {
    return `
      <h1>$ contact --available</h1>
      <p><strong>Email:</strong> aazizzailani.dev@gmail.com</p>
      <p><strong>GitHub:</strong> github.com/azizzailani</p>
      <p><strong>LinkedIn:</strong> linkedin.com/in/aazizzailani</p>
      <p><strong>Location:</strong> Indonesia (WIB)</p>
      <p><em>Open for remote opportunities</em></p>
    `;
  }

  /**
   * Get Projects content
   * @returns {string} HTML content
   */
  static getProjectsContent() {
    return `
      <h1>$ ls projects/</h1>
      <h2>Infrastructure Automation</h2>
      <p>Terraform modules for multi-cloud deployment</p>
      <h2>CI/CD Pipeline</h2>
      <p>GitLab CI optimization reducing build time by 40%</p>
      <h2>Monitoring Dashboard</h2>
      <p>Custom Grafana dashboards for system metrics</p>
    `;
  }

  /**
   * Get Stats content
   * @returns {string} HTML content
   */
  static getStatsContent() {
    return `
      <h1>$ cat stats.txt</h1>
      <h2>Performance Metrics</h2>
      <p><strong>Deployments:</strong> 40% faster</p>
      <p><strong>Uptime:</strong> 30% improvement</p>
      <p><strong>Debug Time:</strong> 50% reduction</p>
      <p><strong>Manual Tasks:</strong> 60% automation</p>
    `;
  }

  /**
   * Get demo terminal content
   * @param {string} id - Terminal ID
   * @param {string} size - Terminal size
   * @returns {string} HTML content
   */
  static getDemoContent(id, size) {
    return `
      <h1>$ demo --random</h1>
      <p><strong>ID:</strong> ${id}</p>
      <p><strong>Size:</strong> ${size}</p>
      <p><strong>Position:</strong> Random</p>
      <p><em>This is a demo terminal</em></p>
    `;
  }
}
