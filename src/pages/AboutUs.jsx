import React, { useEffect, useState } from "react";
import { NavigationContainer } from "../navigation";
import { Container, HeadPage } from "../components";
import { FaHospitalUser } from "react-icons/fa6";
import { FormUpdateHospital } from "../features/Hospital";

const AboutUs = () => {
  return (
    <NavigationContainer>
      <HeadPage
        page="About Us"
        icon={<FaHospitalUser className="text-3xl" />}
        className="border-l-teal-600"
      />
      <Container>
        <FormUpdateHospital />
      </Container>
    </NavigationContainer>
  );
};

export default AboutUs;
