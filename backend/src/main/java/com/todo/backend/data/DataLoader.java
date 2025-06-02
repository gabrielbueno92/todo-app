package com.todo.backend.data;

import com.todo.backend.model.Task;
import com.todo.backend.repository.TaskRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {
    private final TaskRepository taskRepository;

    public DataLoader(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public void run(String... args) {
        if (taskRepository.count() == 0) {
            Task task1 = new Task("Learn React", "Complete react tutorial");
            Task task2 = new Task("Practice Spring Boot", "Do a CRUD with Data Base");
            Task task3 = new Task("Go to the Gym", "Do exercises for the groin");

            taskRepository.save(task1);
            taskRepository.save(task2);
            taskRepository.save(task3);

        }
    }
}
