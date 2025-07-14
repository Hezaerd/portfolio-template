import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6">
            Hi, I'm <span className="text-primary">Angel</span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Full-stack developer passionate about creating beautiful and
            functional web experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl">
              View My Work
            </button>
            <button className="px-8 py-3 border-2 border-border text-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-300">
              Download Resume
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-card-foreground mb-12">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-muted-foreground mb-6">
                I'm a passionate developer with expertise in modern web
                technologies. I love building applications that solve real-world
                problems and provide exceptional user experiences.
              </p>
              <p className="text-lg text-muted-foreground">
                When I'm not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with
                the community.
              </p>
            </div>
            <div className="bg-primary p-1 rounded-lg">
              <div className="bg-background p-8 rounded-lg">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Skills & Technologies
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-muted-foreground">React & Next.js</div>
                  <div className="text-muted-foreground">TypeScript</div>
                  <div className="text-muted-foreground">Node.js</div>
                  <div className="text-muted-foreground">Tailwind CSS</div>
                  <div className="text-muted-foreground">Python</div>
                  <div className="text-muted-foreground">PostgreSQL</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(project => (
              <div
                key={project}
                className="bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-border"
              >
                <div className="h-48 bg-primary"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">
                    Project {project}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    A modern web application built with cutting-edge
                    technologies.
                  </p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                      React
                    </span>
                    <span className="px-3 py-1 bg-accent text-accent-foreground text-sm rounded-full">
                      TypeScript
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-card-foreground mb-12">
            Experience & Education
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-card-foreground mb-6">
                Work Experience
              </h3>
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-6">
                  <h4 className="text-lg font-semibold text-card-foreground">
                    Senior Developer
                  </h4>
                  <p className="text-primary">Tech Company • 2022 - Present</p>
                  <p className="text-muted-foreground mt-2">
                    Led development of multiple web applications using modern
                    frameworks.
                  </p>
                </div>
                <div className="border-l-4 border-accent pl-6">
                  <h4 className="text-lg font-semibold text-card-foreground">
                    Full Stack Developer
                  </h4>
                  <p className="text-accent-foreground">
                    Startup • 2020 - 2022
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Built and maintained various web applications and APIs.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-card-foreground mb-6">
                Education
              </h3>
              <div className="space-y-6">
                <div className="border-l-4 border-secondary pl-6">
                  <h4 className="text-lg font-semibold text-card-foreground">
                    Computer Science Degree
                  </h4>
                  <p className="text-secondary-foreground">
                    University • 2016 - 2020
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Studied computer science with focus on software engineering.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
            Let's Work Together
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            I'm always interested in new opportunities and exciting projects.
            Feel free to reach out if you'd like to collaborate!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl">
              Send Message
            </button>
            <button className="px-8 py-3 border-2 border-border text-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-300">
              Schedule Call
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
