'use client';

import React from "react";
import Image from "next/image";

interface AvatarProps {
    src?: string | null | undefined;
    size?: number;
}

const Avatar: React.FC<AvatarProps> = ({
    src,
    size
}) => {
    return (
      <Image
          className="rounded-full"
          height={size}
          width={size}
          alt="Avatar"
          src={src || "/images/avatar.svg"}
      />
    );
};

export default Avatar;