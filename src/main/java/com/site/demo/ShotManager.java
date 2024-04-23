package com.site.demo;

import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.SessionScoped;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import lombok.Getter;
import com.site.demo.model.Shot;
import com.site.demo.repository.ShotRepository;
import com.site.demo.util.MessageManager;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Named @SessionScoped
public class ShotManager implements Serializable {
    @Inject
    private ShotRepository repository;
    @Getter
    private final Shot shot = new Shot();
    @Getter
    private final List<Shot> shots = new ArrayList<>();
    @Getter
    private final List<Integer> availableY = List.of(-3, -2, -1, 0, 1, 2, 3, 4, 5);
    @Getter
    private final List<Double> availableR = List.of(1.0, 1.5, 2.0, 2.5, 3.0);

    @PostConstruct
    public void init() {
        shot.setY(-2.0);
    }

    public void shoot() {
        saveShot(shot);
    }

    public void shootPlot() {
        Map<String, String> requestParameters = FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap();
        String error = requestParameters.get("error");
        if (error != null) {
            MessageManager.error(error);
            return;
        }
        Shot shot = new Shot();
        try {
            System.out.println(requestParameters.get("x"));
            System.out.println(requestParameters.get("y"));
            System.out.println(requestParameters.get("r"));
            shot.setX(Double.parseDouble(requestParameters.get("x")));
            shot.setY(Double.parseDouble(requestParameters.get("y")));
            shot.setR(Double.parseDouble(requestParameters.get("r")));
        } catch (NumberFormatException | NullPointerException e) {
            MessageManager.error("Некорректные значения");
            return;
        }
        saveShot(shot);
    }

    private void saveShot(Shot shot) {
        Shot newShot = repository.create(shot);
        shots.add(newShot);
    }
}
