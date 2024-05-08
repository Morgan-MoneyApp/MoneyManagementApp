import React from 'react';
import '../styles/team.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Photo from '../images/profilepic.png';
import AlicePhoto from '../images/AlicePhoto.jpeg';

const teamMembers = [
  {
    name: 'Alice Gonzalez',
    bio: 'Alice is a Junior Software Developer who also has over 10 years of experience in healthcare, both in clinical and administrative roles.',
    photo: AlicePhoto,
    linkedinUrl: 'https://www.linkedin.com/in/alicegonzalezcodes/',
  },
  {
    name: 'Jake LastName',
    bio: 'Jane is a project manager who specializes in managing large tech teams and projects.',
    photo: Photo,
    linkedinUrl: 'https://www.linkedin.com/in/janesmith',
  },
  {
    name: 'Jennifer LastName',
    bio: 'Emily is an expert in digital marketing with a focus on growing tech startups.',
    photo: Photo,
    linkedinUrl: 'https://www.linkedin.com/in/emilyjohnson',
  },
  {
    name: 'Jorris LastName',
    bio: 'Michael is a UX/UI designer with a keen eye for creating engaging digital experiences.',
    photo: Photo,
    linkedinUrl: 'https://www.linkedin.com/in/michaelbrown',
  },
  {
    name: 'Matthew LastName',
    bio: 'Sarah is our customer service leader, dedicated to improving user satisfaction and engagement.',
    photo: Photo,
    linkedinUrl: 'https://www.linkedin.com/in/sarahdavis',
  },
];

function Team() {
  return (
    <div className="team-container">
      {teamMembers.map((member, index) => (
        <div key={index} className="team-member">
          <img src={member.photo} alt={member.name} className="member-photo" />
          <div className="member-info">
            <h3>{member.name}</h3>
            <p>{member.bio}</p>
            <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Team;
