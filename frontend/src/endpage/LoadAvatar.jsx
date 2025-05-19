import React from 'react'
import { MenProAvatar } from '../3d/MenProAvatar'
import { WomanProAvatar } from '../3d/WomanProAvatar'
import { MenRelaxAvatar } from '../3d/MenRelaxAvatar'
import { WomanRelaxAvatar } from '../3d/WomanRelaxAvatar'

/**
 * Avatar component
 * Renders the correct avatar based on global characterMode and characterGender.
 */
export default function LoadAvatar({animation="idle", gender="male", mode="pro", ...props}) {
  // const { animation } = props;
  // Determine which avatar to render
  let AvatarComponent = null
  if (mode === 'PRO') {
    AvatarComponent = gender === 'male' ? MenProAvatar : WomanProAvatar
  } else if (mode === 'RELAX') {
    AvatarComponent = gender === 'male' ? MenRelaxAvatar : WomanRelaxAvatar
  }

  return (
    <group {...props}>
      {AvatarComponent && <AvatarComponent animation={animation} />}
    </group>
  )
}
