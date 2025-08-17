package com.example.demo.configuration;

import com.example.demo.exception.ClientException;
import com.example.demo.exception.ServerException;
import com.example.demo.webclient.EmployeeClient;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;
import reactor.core.publisher.Mono;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.reactive.function.client.support.WebClientAdapter;

@Configuration
public class EmployeeClientConfig {

    //https://docs.spring.io/spring-framework/reference/integration/rest-clients.html#rest-webclient
    //https://medium.com/nerd-for-tech/webclient-error-handling-made-easy-4062dcf58c49
    //Exchange filter function is other way to handle webclient errors
        //https://docs.spring.io/spring-framework/reference/web/webflux-webclient/client-filter.html
    @Bean
    public EmployeeClient employeeClient(EmployeeServiceProperties properties) {
        WebClient webClient = WebClient.builder()
                .baseUrl(properties.getBaseUrl())
                .defaultStatusHandler(
                    httpStatusCode -> httpStatusCode.value() == HttpStatus.BAD_REQUEST.value(),
                    response -> response.bodyToMono(String.class)
                        .flatMap(body -> Mono.error(new ClientException((HttpStatus) response.statusCode(), body)))
                )
                .defaultStatusHandler(
                    httpStatusCode -> httpStatusCode.value() == HttpStatus.FORBIDDEN.value(),
                    response -> response.bodyToMono(String.class)
                        .flatMap(body -> Mono.error(new ClientException((HttpStatus) response.statusCode(), body)))
                )
                .defaultStatusHandler(
                    HttpStatusCode::is5xxServerError,
                    response -> response.bodyToMono(String.class)
                        .flatMap(body -> Mono.error(new ServerException((HttpStatus) response.statusCode(), body)))
                )
                .build();

        WebClientAdapter adapter = WebClientAdapter.create(webClient);
        HttpServiceProxyFactory httpServiceProxyFactory = HttpServiceProxyFactory.builderFor(adapter).build();
        EmployeeClient employeeClient = httpServiceProxyFactory.createClient(EmployeeClient.class);

        return employeeClient;
    }

}

@Data
@Component
//The official documentation advises that we isolate configuration properties into separate POJOs.
//https://www.baeldung.com/configuration-properties-in-spring-boot#simple-properties
//https://docs.spring.io/spring-boot/docs/2.1.7.RELEASE/reference/html/boot-features-external-config.html#boot-features-external-config-vs-value
@ConfigurationProperties(prefix = "employee-service")
class EmployeeServiceProperties {
    private String baseUrl;
}
