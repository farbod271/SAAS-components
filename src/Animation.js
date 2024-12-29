import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectCard = ({ project }) => {
  const [activeView, setActiveView] = useState(null);

  const handleInfoClick = () => {
    setActiveView('info');
  };

  const handleTagsClick = () => {
    setActiveView('tags');
  };

  const handleClose = () => {
    setActiveView(null);
  };

  const renderContent = () => {
    switch(activeView) {
      case 'info':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-white text-center p-6"
          >
            <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
            <p className="text-lg mb-4">{project.content}</p>
            <button 
              onClick={handleClose}
              className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white"
            >
              Close
            </button>
          </motion.div>
        );
      case 'tags':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-white text-center p-6"
          >
            <h2 className="text-2xl font-bold mb-4">Tags</h2>

            <button 
              onClick={handleClose}
              className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white"
            >
              Close
            </button>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-96 h-96 bg-white shadow-lg rounded-xl overflow-hidden">
      <AnimatePresence>
        {activeView && (
          <motion.div
            key={activeView}
            initial={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '9999px',
              top: activeView === 'info' ? '1rem' : 'auto',
              bottom: activeView === 'tags' ? '1rem' : 'auto',
              right: activeView === 'info' ? '1rem' : 'auto',
              left: activeView === 'tags' ? '1rem' : 'auto',
              position: 'absolute'
            }}
            animate={{ 
              width: '100%', 
              height: '100%', 
              borderRadius: 0, 
              top: 0, 
              bottom: 0, 
              left: 0, 
              right: 0 
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`${activeView === 'info' ? 'bg-blue-500' : 'bg-green-500'} absolute z-40 flex items-center justify-center`}
          >
            {renderContent()}
          </motion.div>
        )}
      </AnimatePresence>
      
      {!activeView && (
        <>
          <div className="absolute top-4 right-4 z-50">
            <button
              onClick={handleInfoClick}
              className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              ℹ️
            </button>
          </div>
          <div className="absolute bottom-4 left-4 z-50">
            <button
              onClick={handleTagsClick}
              className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              🏷️
            </button>
          </div>
        </>
      )}
    </div>
  );
};


const Animation = () => {
  const projects = [
    {
      title: 'Deggenhub',
      content: "this is a passion project that tried to connect the lovely people of Deggendorf",
      tags: ['cookiecutter', 'django', 'docker', 'nginx', 'redis', 'javascript', 'postgres', 'git', 'linux', 'html5', 'css', 'bootstrap'],
      github: 'https://github.com/farbod271/Deggenhub',
      demo: 'https://deggenhub.de'
    },
    {
      title: 'Liebess',
      content: "A demo prject made for a restaurant but its not a production ready project!",
      tags: ['nodejs', 'express', 'mongodb', 'nginx', 'html5', 'css', 'bootstrap'],
      github: 'https://github.com/farbod271/liebess',
      demo: '#'
    },
    {
      title: 'ERL checker bot',
      content: "A bot that checks availability of ERL apartments. this has no affiliation with ERL",
      tags: ['telegram', 'linux', 'git'],
      github: 'https://github.com/farbod271/ERL',
      demo: 'https://t.me/erlcheckerbot'
    },
    {
      title: 'Typing app',
      content: "A simple clone of keybr.com",
      tags: ['nodejs', 'express','web', 'html5', 'css', 'bootstrap'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Blog app',
      content: "The Blog app in this portfolio",
      tags: ['nodejs', 'express','web', 'mongodb', 'nginx', 'html5', 'css', 'bootstrap'],
      github: '#',
      demo: '#'
    }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
};

export default Animation;