import { Typography } from '@mui/material'
import './BrandComponents.css'

export default function Topics() {
    const topics: TopicResponse[] = [
        {
            id: 1,
            name: 'Topic 1',
            topicId: 1,
        },
        {
            id: 2,
            name: 'Topic 2',
            topicId: 2,
        },
        {
            id: 3,
            name: 'Topic 3',
            topicId: 3,
        },
        {
            id: 4,
            name: 'Topic 4',
            topicId: 4,
        },
    ]

  return (
      <div className='topic-component' >
          <div className='topic-section-header-container'>
          <Typography className='topic-section-header' variant='h1'>Topics</Typography>
              <Typography variant='body1' className='topic-section-description' >dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus ornare suspendisse sed nisi lacus sed viverra. Vitae justo eget magna fermentum iaculis eu. Ultrices neque ornare aenean euismod elementum nisi quis. Ac felis donec et odio. </Typography>
          </div>
          <div className='topic-container'>
              {topics.map((topic) => (
                  <div className='topic'>
                      <Typography variant='body1' className='topic-name'>{topic.name}</Typography>
                      </div>
                ))}
                      
              </div>    
    </div>
  )
}

 