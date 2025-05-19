import React from 'react'
import { useCharacterCustomization } from './CharacterCustomizationContext'
import { MenProAvatar } from './MenProAvatar'
import { WomanProAvatar } from './WomanProAvatar'
import { MenRelaxAvatar } from './MenRelaxAvatar'
import { WomanRelaxAvatar } from './WomanRelaxAvatar'

/**
 * Avatar component
 * Renders the correct avatar based on global characterMode and characterGender.
 */
export default function Avatar({animation, ...props}) {
  const { characterMode, characterGender } = useCharacterCustomization()
  // const { animation } = props;
  // Determine which avatar to render
  let AvatarComponent = null
  if (characterMode === 'PRO') {
    AvatarComponent = characterGender === 'male' ? MenProAvatar : WomanProAvatar
  } else if (characterMode === 'RELAX') {
    AvatarComponent = characterGender === 'male' ? MenRelaxAvatar : WomanRelaxAvatar
  }

  return (
    <group {...props}>
      {AvatarComponent && <AvatarComponent animation={animation} />}
    </group>
  )
}
