package com.taskmanager.service;

import com.taskmanager.dto.TaskRequest;
import com.taskmanager.dto.TaskResponse;
import com.taskmanager.entity.Task;
import com.taskmanager.entity.TaskStatus;
import com.taskmanager.entity.User;
import com.taskmanager.exception.ResourceNotFoundException;
import com.taskmanager.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final CurrentUserProvider currentUserProvider;

    public List<TaskResponse> getAllTasks(TaskStatus statusFilter) {
        User user = currentUserProvider.getCurrentUser();

        List<Task> tasks = (statusFilter == null)
                ? taskRepository.findByUserIdOrderByIdDesc(user.getId())
                : taskRepository.findByUserIdAndStatusOrderByIdDesc(user.getId(), statusFilter);

        return tasks.stream().map(this::toResponse).toList();
    }

    public TaskResponse getTaskById(Long id) {
        User user = currentUserProvider.getCurrentUser();
        Task task = findOwnedTaskOrThrow(id, user.getId());
        return toResponse(task);
    }

    public TaskResponse createTask(TaskRequest request) {
        User user = currentUserProvider.getCurrentUser();

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .dueDate(request.getDueDate())
                .status(request.getStatus() != null ? request.getStatus() : TaskStatus.PENDING)
                .user(user)
                .build();

        return toResponse(taskRepository.save(task));
    }

    public TaskResponse updateTask(Long id, TaskRequest request) {
        User user = currentUserProvider.getCurrentUser();
        Task task = findOwnedTaskOrThrow(id, user.getId());

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setDueDate(request.getDueDate());
        if (request.getStatus() != null) {
            task.setStatus(request.getStatus());
        }

        return toResponse(taskRepository.save(task));
    }

    public void deleteTask(Long id) {
        User user = currentUserProvider.getCurrentUser();
        Task task = findOwnedTaskOrThrow(id, user.getId());
        taskRepository.delete(task);
    }

    // ---- helpers ----

    private Task findOwnedTaskOrThrow(Long id, Long userId) {
        // Using findByIdAndUserId (rather than findById + manual check) means a task
        // that exists but belongs to someone else returns 404, not 403 — this avoids
        // leaking whether a given task ID exists at all to a user who doesn't own it.
        return taskRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
    }

    private TaskResponse toResponse(Task task) {
        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .dueDate(task.getDueDate())
                .status(task.getStatus())
                .build();
    }
}
