$zodiacDir = $PSScriptRoot

function Make-Badge($innerSvg) {
    return @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFDF8"/>
      <stop offset="70%" stop-color="#FDF3DE"/>
      <stop offset="100%" stop-color="#EEDCB9"/>
    </radialGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ECC67C"/>
      <stop offset="50%" stop-color="#B87314"/>
      <stop offset="100%" stop-color="#7A1414"/>
    </linearGradient>
    <filter id="sh" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="1.5" stdDeviation="1" flood-color="#5E0D0D" flood-opacity="0.15"/>
    </filter>
  </defs>
  <!-- Outer Gold Ring -->
  <circle cx="40" cy="40" r="38" fill="url(#bg)" stroke="url(#gold)" stroke-width="2.5" filter="url(#sh)"/>
  <circle cx="40" cy="40" r="34" fill="none" stroke="#DFBA73" stroke-width="1" stroke-dasharray="2,2"/>
  $innerSvg
</svg>
"@
}

# 1. TÝ (Chuột)
$ty = Make-Badge @'
  <!-- Mouse -->
  <circle cx="28" cy="27" r="9" fill="#8B1E1E"/>
  <circle cx="28" cy="27" r="5" fill="#DFBA73"/>
  <circle cx="52" cy="27" r="9" fill="#8B1E1E"/>
  <circle cx="52" cy="27" r="5" fill="#DFBA73"/>
  <ellipse cx="40" cy="45" rx="16" ry="18" fill="#8B1E1E"/>
  <ellipse cx="40" cy="48" rx="10" ry="12" fill="#FFF4DE"/>
  <!-- Head -->
  <ellipse cx="40" cy="38" rx="13" ry="11" fill="#7A1414"/>
  <circle cx="34" cy="36" r="2.2" fill="#FFE6AA"/>
  <circle cx="46" cy="36" r="2.2" fill="#FFE6AA"/>
  <ellipse cx="40" cy="41" rx="3.5" ry="2" fill="#3D0000"/>
  <!-- Whiskers -->
  <line x1="33" y1="41" x2="20" y2="40" stroke="#B87314" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="33" y1="43" x2="19" y2="44" stroke="#B87314" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="47" y1="41" x2="60" y2="40" stroke="#B87314" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="47" y1="43" x2="61" y2="44" stroke="#B87314" stroke-width="1.2" stroke-linecap="round"/>
  <!-- Gold Ingot -->
  <path d="M34,55 C34,51 46,51 46,55 C48,60 32,60 34,55 Z" fill="#DFBA73" stroke="#B87314" stroke-width="1"/>
  <!-- Tail -->
  <path d="M54,58 C63,59 67,52 64,44" fill="none" stroke="#8B1E1E" stroke-width="2" stroke-linecap="round"/>
'@
[System.IO.File]::WriteAllText("$zodiacDir\ty.svg", $ty, [System.Text.Encoding]::UTF8)

# 2. SỬU (Trâu)
$suu = Make-Badge @'
  <!-- Ox Horns -->
  <path d="M22,30 C20,18 35,21 38,28" fill="none" stroke="#DFBA73" stroke-width="4.5" stroke-linecap="round"/>
  <path d="M58,30 C60,18 45,21 42,28" fill="none" stroke="#DFBA73" stroke-width="4.5" stroke-linecap="round"/>
  <!-- Head & Ears -->
  <ellipse cx="23" cy="36" rx="6" ry="3" transform="rotate(-20, 23, 36)" fill="#8B1E1E"/>
  <ellipse cx="57" cy="36" rx="6" ry="3" transform="rotate(20, 57, 36)" fill="#8B1E1E"/>
  <ellipse cx="40" cy="46" rx="16" ry="17" fill="#8B1E1E"/>
  <ellipse cx="40" cy="38" rx="14" ry="12" fill="#7A1414"/>
  <!-- Eyes -->
  <circle cx="33" cy="35" r="2.2" fill="#FFE6AA"/>
  <circle cx="47" cy="35" r="2.2" fill="#FFE6AA"/>
  <!-- Snout -->
  <ellipse cx="40" cy="47" rx="10" ry="7" fill="#FFF4DE" stroke="#B87314" stroke-width="1"/>
  <circle cx="36" cy="47" r="2" fill="#5E0D0D"/>
  <circle cx="44" cy="47" r="2" fill="#5E0D0D"/>
  <circle cx="40" cy="53" r="3" fill="none" stroke="#DFBA73" stroke-width="1.5"/>
'@
[System.IO.File]::WriteAllText("$zodiacDir\suu.svg", $suu, [System.Text.Encoding]::UTF8)

# 3. DẦN (Hổ)
$dan = Make-Badge @'
  <!-- Tiger Ears -->
  <circle cx="28" cy="27" r="7" fill="#8B1E1E"/>
  <circle cx="28" cy="27" r="4" fill="#DFBA73"/>
  <circle cx="52" cy="27" r="7" fill="#8B1E1E"/>
  <circle cx="52" cy="27" r="4" fill="#DFBA73"/>
  <!-- Head -->
  <ellipse cx="40" cy="46" rx="16" ry="17" fill="#8B1E1E"/>
  <ellipse cx="40" cy="40" rx="15" ry="13" fill="#A32424"/>
  <!-- Wang character / forehead stripes -->
  <path d="M35,29 L45,29 M37,32 L43,32 M35,35 L45,35 M40,29 L40,35" stroke="#FFE6AA" stroke-width="1.5" stroke-linecap="round"/>
  <!-- Eyes -->
  <ellipse cx="32" cy="39" rx="2.5" ry="2" fill="#FFE6AA"/>
  <circle cx="32" cy="39" r="1.2" fill="#3D0000"/>
  <ellipse cx="48" cy="39" rx="2.5" ry="2" fill="#FFE6AA"/>
  <circle cx="48" cy="39" r="1.2" fill="#3D0000"/>
  <!-- Cheeks & Snout -->
  <ellipse cx="40" cy="47" rx="8" ry="6" fill="#FFF4DE"/>
  <polygon points="38,44 42,44 40,47" fill="#3D0000"/>
  <!-- Whisker stripes -->
  <path d="M22,37 L29,39 M21,43 L28,43 M58,37 L51,39 M59,43 L52,43" stroke="#3D0000" stroke-width="1.8" stroke-linecap="round"/>
'@
[System.IO.File]::WriteAllText("$zodiacDir\dan.svg", $dan, [System.Text.Encoding]::UTF8)

# 4. MÃO (Mèo)
$mao = Make-Badge @'
  <!-- Cat Pointed Ears -->
  <polygon points="24,35 30,19 37,30" fill="#8B1E1E" stroke="#DFBA73" stroke-width="1"/>
  <polygon points="27,32 31,23 35,29" fill="#DFBA73"/>
  <polygon points="56,35 50,19 43,30" fill="#8B1E1E" stroke="#DFBA73" stroke-width="1"/>
  <polygon points="53,32 49,23 45,29" fill="#DFBA73"/>
  <!-- Head & Body -->
  <ellipse cx="40" cy="48" rx="15" ry="16" fill="#8B1E1E"/>
  <ellipse cx="40" cy="41" rx="14" ry="12" fill="#991B1B"/>
  <ellipse cx="40" cy="51" rx="9" ry="11" fill="#FFF4DE"/>
  <!-- Eyes -->
  <ellipse cx="33" cy="39" rx="2.5" ry="3" fill="#DFBA73"/>
  <ellipse cx="33" cy="39" rx="1" ry="2.5" fill="#3D0000"/>
  <ellipse cx="47" cy="39" rx="2.5" ry="3" fill="#DFBA73"/>
  <ellipse cx="47" cy="39" rx="1" ry="2.5" fill="#3D0000"/>
  <!-- Nose & Whiskers -->
  <polygon points="38.5,43 41.5,43 40,45" fill="#DFBA73"/>
  <line x1="33" y1="44" x2="20" y2="43" stroke="#B87314" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="33" y1="46" x2="19" y2="47" stroke="#B87314" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="47" y1="44" x2="60" y2="43" stroke="#B87314" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="47" y1="46" x2="61" y2="47" stroke="#B87314" stroke-width="1.2" stroke-linecap="round"/>
  <!-- Bell -->
  <circle cx="40" cy="53" r="3" fill="#DFBA73" stroke="#B87314" stroke-width="1"/>
'@
[System.IO.File]::WriteAllText("$zodiacDir\mao.svg", $mao, [System.Text.Encoding]::UTF8)

# 5. THÌN (Rồng)
$thin = Make-Badge @'
  <!-- Dragon Antlers & Mane -->
  <path d="M33,26 C31,18 36,18 38,24 M47,26 C49,18 44,18 42,24" stroke="#DFBA73" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M22,34 C25,27 33,30 33,34 M58,34 C55,27 47,30 47,34" stroke="#ECC67C" stroke-width="2" stroke-linecap="round"/>
  <!-- Serpent Body Swirl -->
  <path d="M27,56 C24,44 40,36 40,33 C40,43 56,48 53,58 C50,68 30,66 27,56 Z" fill="#8B1E1E"/>
  <!-- Head -->
  <ellipse cx="40" cy="35" rx="11" ry="9" fill="#7A1414"/>
  <!-- Glowing Eyes -->
  <circle cx="35" cy="33" r="2.2" fill="#FFE6AA"/>
  <circle cx="45" cy="33" r="2.2" fill="#FFE6AA"/>
  <circle cx="35" cy="33" r="1" fill="#7A1414"/>
  <circle cx="45" cy="33" r="1" fill="#7A1414"/>
  <!-- Moustache / Barbels -->
  <path d="M36,39 C30,42 24,37 20,40" fill="none" stroke="#DFBA73" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M44,39 C50,42 56,37 60,40" fill="none" stroke="#DFBA73" stroke-width="1.5" stroke-linecap="round"/>
  <!-- Pearl of Wisdom -->
  <circle cx="40" cy="51" r="5.5" fill="#FFE6AA" stroke="#B87314" stroke-width="1.5"/>
  <circle cx="38" cy="49" r="1.5" fill="#FFF"/>
'@
[System.IO.File]::WriteAllText("$zodiacDir\thin.svg", $thin, [System.Text.Encoding]::UTF8)

# 6. TỴ (Rắn)
$ty2 = Make-Badge @'
  <!-- Coiled Snake -->
  <path d="M40,24 C48,24 54,29 54,36 C54,43 45,45 37,47 C29,49 26,54 28,60 C31,66 49,67 54,59 C57,54 53,50 49,52" fill="none" stroke="#8B1E1E" stroke-width="9" stroke-linecap="round"/>
  <path d="M40,24 C48,24 54,29 54,36 C54,43 45,45 37,47 C29,49 26,54 28,60 C31,66 49,67 54,59 C57,54 53,50 49,52" fill="none" stroke="#DFBA73" stroke-width="3" stroke-linecap="round" stroke-dasharray="2,5"/>
  <!-- Snake Head -->
  <ellipse cx="38" cy="24" rx="8" ry="6.5" fill="#7A1414"/>
  <circle cx="35" cy="22" r="1.8" fill="#FFE6AA"/>
  <circle cx="41" cy="22" r="1.8" fill="#FFE6AA"/>
  <!-- Forked Tongue -->
  <path d="M38,18 L38,13 M38,13 L35,10 M38,13 L41,10" stroke="#DFBA73" stroke-width="1.2" stroke-linecap="round"/>
  <!-- Gold Flower Motif -->
  <circle cx="40" cy="58" r="3.5" fill="#DFBA73"/>
  <circle cx="40" cy="58" r="1.5" fill="#7A1414"/>
'@
[System.IO.File]::WriteAllText("$zodiacDir\ty2.svg", $ty2, [System.Text.Encoding]::UTF8)

# 7. NGỌ (Ngựa)
$ngo = Make-Badge @'
  <!-- Horse Ears -->
  <polygon points="32,23 36,15 38,23" fill="#8B1E1E"/>
  <polygon points="41,23 44,16 46,23" fill="#8B1E1E"/>
  <!-- Flowing Mane -->
  <path d="M44,22 C49,20 54,26 53,34 C56,33 58,40 54,47" fill="none" stroke="#DFBA73" stroke-width="3" stroke-linecap="round"/>
  <!-- Head & Neck -->
  <path d="M33,24 C33,24 45,23 45,30 C45,34 38,35 34,44 C31,48 31,58 31,62 L48,62 C50,53 49,42 46,36 L44,24 Z" fill="#8B1E1E"/>
  <path d="M30,35 C24,38 23,43 27,47 C33,48 35,42 34,36 Z" fill="#7A1414"/>
  <!-- Eye -->
  <ellipse cx="32" cy="34" rx="2" ry="1.5" fill="#FFE6AA"/>
  <circle cx="32" cy="34" r="1" fill="#3D0000"/>
  <!-- Bridle / Gold Ornament -->
  <circle cx="28" cy="43" r="2.5" fill="#DFBA73"/>
  <path d="M28,43 L34,36" stroke="#DFBA73" stroke-width="1.2"/>
'@
[System.IO.File]::WriteAllText("$zodiacDir\ngo.svg", $ngo, [System.Text.Encoding]::UTF8)

# 8. MÙI (Dê)
$mui = Make-Badge @'
  <!-- Spiral Horns -->
  <path d="M32,28 C26,17 17,24 22,33" fill="none" stroke="#DFBA73" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M48,28 C54,17 63,24 58,33" fill="none" stroke="#DFBA73" stroke-width="3.5" stroke-linecap="round"/>
  <!-- Ears -->
  <ellipse cx="22" cy="36" rx="5" ry="2.5" transform="rotate(20, 22, 36)" fill="#8B1E1E"/>
  <ellipse cx="58" cy="36" rx="5" ry="2.5" transform="rotate(-20, 58, 36)" fill="#8B1E1E"/>
  <!-- Head & Body -->
  <ellipse cx="40" cy="47" rx="15" ry="16" fill="#8B1E1E"/>
  <path d="M33,30 L47,30 L45,46 C45,51 35,51 35,46 Z" fill="#7A1414"/>
  <!-- Beard -->
  <path d="M38,50 L42,50 L40,57 Z" fill="#FFF4DE"/>
  <!-- Eyes & Nose -->
  <circle cx="36" cy="36" r="1.8" fill="#FFE6AA"/>
  <circle cx="44" cy="36" r="1.8" fill="#FFE6AA"/>
  <ellipse cx="40" cy="44" rx="2.5" ry="1.5" fill="#3D0000"/>
'@
[System.IO.File]::WriteAllText("$zodiacDir\mui.svg", $mui, [System.Text.Encoding]::UTF8)

# 9. THÂN (Khỉ)
$than = Make-Badge @'
  <!-- Monkey Big Round Ears -->
  <circle cx="23" cy="36" r="7.5" fill="#8B1E1E"/>
  <circle cx="23" cy="36" r="4.5" fill="#DFBA73"/>
  <circle cx="57" cy="36" r="7.5" fill="#8B1E1E"/>
  <circle cx="57" cy="36" r="4.5" fill="#DFBA73"/>
  <!-- Body & Head -->
  <ellipse cx="40" cy="48" rx="15" ry="16" fill="#8B1E1E"/>
  <ellipse cx="40" cy="38" rx="14" ry="12" fill="#7A1414"/>
  <!-- Heart-shaped Face Mask -->
  <path d="M40,35 C36,30 28,31 30,39 C31,45 40,48 40,48 C40,48 49,45 50,39 C52,31 44,30 40,35 Z" fill="#FFF4DE"/>
  <!-- Eyes -->
  <circle cx="35" cy="37" r="1.8" fill="#3D0000"/>
  <circle cx="45" cy="37" r="1.8" fill="#3D0000"/>
  <ellipse cx="40" cy="42" rx="2" ry="1.2" fill="#8B1E1E"/>
  <!-- Peach of Longevity -->
  <path d="M40,53 C36,49 33,54 36,58 C39,61 40,63 40,63 C40,63 41,61 44,58 C47,54 44,49 40,53 Z" fill="#ECC67C" stroke="#B87314" stroke-width="1"/>
'@
[System.IO.File]::WriteAllText("$zodiacDir\than.svg", $than, [System.Text.Encoding]::UTF8)

# 10. DẬU (Gà)
$dau = Make-Badge @'
  <!-- Rooster Cockscomb -->
  <path d="M33,24 C31,18 36,17 38,20 C40,16 45,16 45,21 C48,18 52,21 49,26 L33,26 Z" fill="#DFBA73"/>
  <!-- Head & Body -->
  <ellipse cx="40" cy="48" rx="15" ry="16" fill="#8B1E1E"/>
  <circle cx="39" cy="33" r="10" fill="#7A1414"/>
  <!-- Eye -->
  <circle cx="36" cy="31" r="2.2" fill="#FFE6AA"/>
  <circle cx="36" cy="31" r="1.1" fill="#3D0000"/>
  <!-- Beak & Wattle -->
  <polygon points="30,34 23,37 30,39" fill="#DFBA73"/>
  <path d="M32,39 C30,44 35,45 34,40 Z" fill="#B87314"/>
  <!-- Chest Feather Arc -->
  <path d="M34,47 C37,55 45,55 48,47" fill="none" stroke="#DFBA73" stroke-width="2"/>
  <!-- Tail Feathers -->
  <path d="M51,46 C59,42 63,33 60,25 C58,35 55,42 48,48" fill="#DFBA73"/>
'@
[System.IO.File]::WriteAllText("$zodiacDir\dau.svg", $dau, [System.Text.Encoding]::UTF8)

# 11. TUẤT (Chó)
$tuat = Make-Badge @'
  <!-- Drooping Ears -->
  <path d="M26,30 C20,33 21,45 26,43 C29,41 29,32 26,30 Z" fill="#5E0D0D"/>
  <path d="M54,30 C60,33 59,45 54,43 C51,41 51,32 54,30 Z" fill="#5E0D0D"/>
  <!-- Head & Body -->
  <ellipse cx="40" cy="49" rx="15" ry="16" fill="#8B1E1E"/>
  <ellipse cx="40" cy="38" rx="13" ry="12" fill="#7A1414"/>
  <!-- Face Patch & Snout -->
  <ellipse cx="40" cy="43" rx="7" ry="5.5" fill="#FFF4DE"/>
  <ellipse cx="40" cy="41" rx="3.5" ry="2.2" fill="#3D0000"/>
  <!-- Eyes -->
  <circle cx="34" cy="35" r="2" fill="#FFE6AA"/>
  <circle cx="34" cy="35" r="1.1" fill="#3D0000"/>
  <circle cx="46" cy="35" r="2" fill="#FFE6AA"/>
  <circle cx="46" cy="35" r="1.1" fill="#3D0000"/>
  <!-- Collar with Gold Bell -->
  <path d="M31,52 C35,55 45,55 49,52" stroke="#DFBA73" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="40" cy="56" r="3" fill="#DFBA73" stroke="#B87314" stroke-width="1"/>
'@
[System.IO.File]::WriteAllText("$zodiacDir\tuat.svg", $tuat, [System.Text.Encoding]::UTF8)

# 12. HỢI (Lợn)
$hoi = Make-Badge @'
  <!-- Pig Pointed Flappy Ears -->
  <polygon points="26,32 22,22 32,26" fill="#DFBA73"/>
  <polygon points="54,32 58,22 48,26" fill="#DFBA73"/>
  <!-- Plump Head & Body -->
  <ellipse cx="40" cy="47" rx="16" ry="17" fill="#8B1E1E"/>
  <circle cx="40" cy="38" r="13" fill="#7A1414"/>
  <!-- Smiling Eyes -->
  <path d="M31,34 C33,31 37,31 38,34" fill="none" stroke="#FFE6AA" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M42,34 C43,31 47,31 49,34" fill="none" stroke="#FFE6AA" stroke-width="1.8" stroke-linecap="round"/>
  <!-- Big Cute Snout -->
  <ellipse cx="40" cy="42" rx="7.5" ry="5" fill="#FFF4DE" stroke="#B87314" stroke-width="1"/>
  <ellipse cx="37" cy="42" rx="1.5" ry="2" fill="#5E0D0D"/>
  <ellipse cx="43" cy="42" rx="1.5" ry="2" fill="#5E0D0D"/>
  <!-- Gold Lucky Ingot -->
  <path d="M35,56 C35,52 45,52 45,56 C47,60 33,60 35,56 Z" fill="#DFBA73" stroke="#B87314" stroke-width="1"/>
'@
[System.IO.File]::WriteAllText("$zodiacDir\hoi.svg", $hoi, [System.Text.Encoding]::UTF8)

Write-Host "All 12 Zodiac SVGs generated successfully in $zodiacDir"
