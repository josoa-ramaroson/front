import React from 'react'
import { MenProAvatar } from '../3d/MenProAvatar'
import { WomanProAvatar } from '../3d/WomanProAvatar'
import { MenRelaxAvatar } from '../3d/MenRelaxAvatar'
import { WomanRelaxAvatar } from '../3d/WomanRelaxAvatar'
import { getAnimationForEmotion } from './EmotionToAnimationMap'

export default function LoadAvatar({ gender, mode, expression }) {
 let AvatarComponent = null
  if (mode === 'PRO') {
    AvatarComponent = gender === 'male' ? MenProAvatar : WomanProAvatar
  } else if (mode === 'RELAX') {
    AvatarComponent = gender === 'male' ? MenRelaxAvatar : WomanRelaxAvatar
  }

  return (
    <group >
      {AvatarComponent && <AvatarComponent  animation={getAnimationForEmotion(expression)}/>}
    </group>
  )
}
