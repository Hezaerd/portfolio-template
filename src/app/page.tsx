import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-2">
            Angel Gimer
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-6 tracking-widest uppercase">
            Game/Engine Programmer
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Passionate about building high-performance game engines, tools, and
            interactive experiences. Specialized in C++, C#, and real-time
            graphics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl">
              View Portfolio
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
                I'm a game and engine programmer with a strong background in
                C++, C#, and real-time graphics. I enjoy building custom
                engines, gameplay systems, and development tools that empower
                creators and players alike.
              </p>
              <p className="text-lg text-muted-foreground">
                My experience spans engine architecture, physics, rendering, and
                cross-platform development. I thrive on solving complex
                technical challenges and collaborating with multidisciplinary
                teams.
              </p>
            </div>
            <div className="bg-primary p-1 rounded-lg">
              <div className="bg-background p-8 rounded-lg">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Skills & Technologies
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-muted-foreground">C++</div>
                  <div className="text-muted-foreground">C#</div>
                  <div className="text-muted-foreground">Unity</div>
                  <div className="text-muted-foreground">Unreal Engine</div>
                  <div className="text-muted-foreground">OpenGL / DirectX</div>
                  <div className="text-muted-foreground">Game Physics</div>
                  <div className="text-muted-foreground">
                    Engine Architecture
                  </div>
                  <div className="text-muted-foreground">Tools Development</div>
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
            {/* Project 1 */}
            <div className="bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-border">
              <div className="h-48 bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                Custom Game Engine
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  Custom Game Engine
                </h3>
                <p className="text-muted-foreground mb-4">
                  A 3D game engine built from scratch in C++ and OpenGL,
                  featuring a real-time renderer, physics, and editor tools.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                    C++
                  </span>
                  <span className="px-3 py-1 bg-accent text-accent-foreground text-sm rounded-full">
                    OpenGL
                  </span>
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                    Engine
                  </span>
                </div>
              </div>
            </div>
            {/* Project 2 */}
            <div className="bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-border">
              <div className="h-48 bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                Physics Sandbox
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  Physics Sandbox
                </h3>
                <p className="text-muted-foreground mb-4">
                  An interactive physics simulation tool for rapid prototyping
                  and educational demos. Built with C# and Unity.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                    C#
                  </span>
                  <span className="px-3 py-1 bg-accent text-accent-foreground text-sm rounded-full">
                    Unity
                  </span>
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                    Physics
                  </span>
                </div>
              </div>
            </div>
            {/* Project 3 */}
            <div className="bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-border">
              <div className="h-48 bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                Platformer Game
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  Platformer Game
                </h3>
                <p className="text-muted-foreground mb-4">
                  A 2D platformer built in Unity, featuring a custom level
                  editor and advanced character controller.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                    Unity
                  </span>
                  <span className="px-3 py-1 bg-accent text-accent-foreground text-sm rounded-full">
                    C#
                  </span>
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                    Level Editor
                  </span>
                </div>
              </div>
            </div>
            {/* Project 4 */}
            <div className="bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-border">
              <div className="h-48 bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                Rendering Demo
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  Rendering Demo
                </h3>
                <p className="text-muted-foreground mb-4">
                  Real-time rendering demo using DirectX 12, showcasing
                  physically based rendering and post-processing effects.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                    DirectX 12
                  </span>
                  <span className="px-3 py-1 bg-accent text-accent-foreground text-sm rounded-full">
                    C++
                  </span>
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                    Rendering
                  </span>
                </div>
              </div>
            </div>
            {/* Project 5 */}
            <div className="bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-border">
              <div className="h-48 bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                AI Pathfinding Toolkit
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  AI Pathfinding Toolkit
                </h3>
                <p className="text-muted-foreground mb-4">
                  Modular toolkit for A* and navigation mesh pathfinding,
                  designed for easy integration into custom engines and Unity
                  projects.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                    C#
                  </span>
                  <span className="px-3 py-1 bg-accent text-accent-foreground text-sm rounded-full">
                    Unity
                  </span>
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                    AI
                  </span>
                </div>
              </div>
            </div>
            {/* Project 6 */}
            <div className="bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-border">
              <div className="h-48 bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                Tools Development
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  Tools Development
                </h3>
                <p className="text-muted-foreground mb-4">
                  Custom tools for asset pipeline automation, level design, and
                  debugging, improving workflow efficiency for game teams.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                    C#
                  </span>
                  <span className="px-3 py-1 bg-accent text-accent-foreground text-sm rounded-full">
                    Unity
                  </span>
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                    Tools
                  </span>
                </div>
              </div>
            </div>
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
                    Senior Game Engine Developer
                  </h4>
                  <p className="text-primary">Indie Studio • 2022 - Present</p>
                  <p className="text-muted-foreground mt-2">
                    Led the development of a custom 3D engine and tools for a
                    cross-platform game project.
                  </p>
                </div>
                <div className="border-l-4 border-accent pl-6">
                  <h4 className="text-lg font-semibold text-card-foreground">
                    Gameplay Programmer
                  </h4>
                  <p className="text-accent-foreground">
                    Game Studio • 2020 - 2022
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Implemented core gameplay systems and optimized performance
                    for shipped titles.
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
                    B.Sc. in Computer Science
                  </h4>
                  <p className="text-secondary-foreground">
                    University • 2016 - 2020
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Specialized in graphics programming, algorithms, and
                    software engineering.
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
