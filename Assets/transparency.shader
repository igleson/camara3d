﻿Shader "Custom/transparency" {
	Properties {
         _Color("Color & Transparency", Color) = (0, 0, 0, 0.3)
     }
     SubShader {
         Lighting Off
         ZWrite Off
         Cull Back
         Blend SrcAlpha OneMinusSrcAlpha
         Tags {"Queue" = "Transparent"}
         Color[_Color]
         Pass {
         }
     } 
     FallBack "Unlit/Transparent"
}
