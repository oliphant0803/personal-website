export default function Home() {
  return (
    <div className="home-container">
      <section className="bio-section">
        <h2>Bio</h2>
        <p>
          I'm <strong className="highlight-text">Oliver</strong>, a first-year Master of Science student in Computer Science at the{' '}
          <a href="https://web.cs.toronto.edu/" target="_blank" rel="noopener noreferrer" className="styled-link">
            University of Toronto
          </a>
          , where I'm fortunate to be advised by{' '}
          <a href="https://carolinanobre.com/" target="_blank" rel="noopener noreferrer" className="styled-link">
            Prof. Carolina Nobre
          </a>{' '}
          in the{' '}
          <a href="https://www.dgp.toronto.edu/" target="_blank" rel="noopener noreferrer" className="styled-link">
            Dynamic Graphics Project (DGP) Lab
          </a>
          . My research focuses on <strong className="highlight-text">data visualization for decision-making</strong>,{' '}
          <strong className="highlight-text">human-AI collaboration</strong>, and improving{' '}
          <strong className="highlight-text">explainable AI (XAI)</strong> in educational contexts.
        </p>

        <p>
          Before beginning my master's, I completed an Honours Bachelor of Science in Computer Science and Statistics at the{' '}
          <a href="https://www.artsci.utoronto.ca/" target="_blank" rel="noopener noreferrer" className="styled-link">
            University of Toronto
          </a>
          , where I had the privilege of working with{' '}
          <a href="https://www.tovigrossman.com/" target="_blank" rel="noopener noreferrer" className="styled-link">
            Prof. Tovi Grossman
          </a>{' '}
          and{' '}
          <a href="https://carolinanobre.com/" target="_blank" rel="noopener noreferrer" className="styled-link">
            Prof. Carolina Nobre
          </a>
          . During this time, I led the design and development of{' '}
          <strong className="highlight-text">generative AI tools for computer science education</strong> and contributed to{' '}
          <strong className="highlight-text">novel time-series data visualizations</strong>.
        </p>

        <p>
          As a junior researcher, I am actively exploring new opportunities and research topics within my areas of interest. 
          I'm particularly excited about advancing the use of <strong className="highlight-text">XAI and visualization techniques</strong> to assist 
          people in making more informed decisions.
        </p>
      </section>

      <section className="publications-section">
        <h2>Conference Papers</h2>
        <div className="featured-publications">
          <PublicationsList maxCount={3} />
        </div>
        <div className="section-link">
          <a href="/publications" className="styled-link view-all-link">
            View all publications →
          </a>
        </div>
      </section>
    </div>
  );
}

// Component to render a limited list of publications with focus on conference papers
function PublicationsList({ maxCount = 3 }) {
  // Import data if running in browser
  const publicationsData = require('@/data/publications.json');
  
  // Filter conference papers and limit to maxCount
  const conferencePapers = publicationsData.publications
    .filter(pub => 
      // Filter papers from conferences (typically have venue names like "CHI", "UIST", "IUI", etc.)
      pub.venue?.shortName?.includes(' ') || 
      pub.venue?.fullName?.toLowerCase().includes('conference')
    )
    .slice(0, maxCount);

  // Function to format author list with your name bolded
  const formatAuthors = (authors) => {
    return authors.map((author, index) => {
      const isLastAuthor = index === authors.length - 1;
      const separator = isLastAuthor ? '' : ', ';
      
      if (author === 'Oliver Huang') {
        return <span key={index}><strong>{author}</strong>{separator}</span>;
      } else {
        return <span key={index}>{author}{separator}</span>;
      }
    });
  };

  return (
    <div className="conference-papers-list">
      {conferencePapers.map((pub) => (
        <div className="publication-card" key={pub.id}>
          <div className="publication-header">
            <span className="venue-shortname">{pub.venue.shortName}</span>
            <h3 className="publication-title">{pub.title}</h3>
          </div>
          
          <p className="authors">{formatAuthors(pub.authors)}</p>
          
          {pub.tags && pub.tags.length > 0 && (
            <div className="pub-tags">
              {pub.tags.map((tag, index) => (
                <span key={index} className="pub-tag">{tag}</span>
              ))}
            </div>
          )}
          
          <div className="publication-links">
            {pub.links.pdf && (
              <a href={pub.links.pdf} target="_blank" rel="noopener noreferrer" className="pub-link pdf-link">PDF</a>
            )}
            {pub.links.code && (
              <a href={pub.links.code} target="_blank" rel="noopener noreferrer" className="pub-link code-link">Code</a>
            )}
            {pub.links.doi && (
              <a href={pub.links.doi} target="_blank" rel="noopener noreferrer" className="pub-link">DOI</a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
