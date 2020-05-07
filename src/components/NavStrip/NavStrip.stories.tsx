import React from "react";
import NavStrip from "./NavStrip";

export default {
  component: NavStrip,
  title: "NavStrip",
  excludeStories: /.*Data$/,
};

export const Default = () => <NavStrip />;
