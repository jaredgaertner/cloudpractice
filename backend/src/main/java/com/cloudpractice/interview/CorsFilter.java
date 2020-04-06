package com.cloudpractice.interview;

import org.springframework.beans.factory.annotation.Value;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.ext.Provider;
import java.io.IOException;

@Provider
public class CorsFilter implements ContainerResponseFilter {
    @Value("${spring.profiles.active:prod}")
    private String activeProfile;

    @Override
    public void filter(ContainerRequestContext requestContext,
                       ContainerResponseContext responseContext) throws IOException {
        String url = "http://34.217.27.245:8080";
        if (activeProfile == "local") {
            url = "http://localhost:8090";
        }
        responseContext.getHeaders().add(
                "Access-Control-Allow-Origin", "*");
        responseContext.getHeaders().add(
                "Access-Control-Allow-Credentials", "true");
        responseContext.getHeaders().add(
                "Access-Control-Allow-Headers",
                "origin, content-type, accept, authorization");
        responseContext.getHeaders().add(
                "Access-Control-Allow-Methods",
                "GET, POST, PUT, DELETE, OPTIONS, HEAD");
    }
}